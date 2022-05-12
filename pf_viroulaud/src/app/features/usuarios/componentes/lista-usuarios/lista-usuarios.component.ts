import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/core/Clases/usuario';
import { ConfirmModalComponent } from 'src/app/core/componentes/confirm-modal/confirm-modal.component';
import { LoginService } from 'src/app/core/ServiciosAPI/login.service';
import { RolesService } from 'src/app/core/ServiciosAPI/roles.service';
import { UsuarioService } from 'src/app/core/ServiciosAPI/usuario.service';
import { selectSesionUsuario } from 'src/app/core/state/sesionUsuario/sesion-usuario.selectors';
import { AbmUsuarioComponent } from '../abm-usuario/abm-usuario.component';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit, OnDestroy {

  usuarios$?: Observable<Usuario[]>;
  suscripcion: any;

  @ViewChild(MatTable, {static: true}) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  tipoLista:string="Usuario";
  tituloLista:string="Listado de Usuarios";
  rol:any=[];
  ds:any;
  rolActivo:number=0;

  nombreColumnas:string[]=["id","nombre","dni","email","telefono","editar"];
  
  constructor(
    public dialog:MatDialog, 
    private usuarioService: UsuarioService,
    private servicioRoles:RolesService,
    private store:Store,
    private ruta:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.store.select(selectSesionUsuario)
      .subscribe(sesionUsuario=>{        
        this.rolActivo=sesionUsuario.usuarioEnSesion.rol;
      });

      this.ruta.paramMap.subscribe(params => {
        let tipo=params.get('tipo');
        switch(tipo){ 
          case "al":
            this.tipoLista="Alumno";
            this.tituloLista="Listado de Alumnos";
            break;
          case "us":
            this.tipoLista="Usuario";
            this.tituloLista="Listado de Usuarios";
            break;
        }
        this.listar();
      });

    
  }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
    
    this.ds=null;
  }

  listar()
  {
    if (this.suscripcion!=undefined) {
      this.suscripcion.unsubscribe();
      }

    let rl=this.servicioRoles.getRolPorNombre(this.tipoLista);
    this.rol=[{id:rl.id,nombre:rl.nombre}];

    this.usuarios$ = this.usuarioService.getUsuarios();
    this.suscripcion = this.usuarios$.subscribe(
      (usuarios) => {
        if (this.tipoLista=="Alumno"){
          this.ds=new MatTableDataSource(usuarios.filter(usuario=>usuario.rol==rl.id));
        }
        else{
          this.ds= new MatTableDataSource<Usuario>(usuarios);
        }
        
        this.ds.paginator = this.paginator;
      }
    );
  }

  altaUsuario()
  {
    const refDialog=this.dialog.open(AbmUsuarioComponent,{data:{datosUsr: new Usuario(0,"","",new Date(),0,"",0,"","",1,undefined),
    rolesPermitidos:this.servicioRoles.getRoles(),
    soloLectura:false}});

    refDialog.afterClosed().subscribe(result => {
      if(result!=null)
      {
        let addUsr=this.usuarioService.addUsuario(result);

        if (addUsr!=null) {
          addUsr.subscribe(
            data => {

              this.table.renderRows();

              this.listar();
              this.ds.paginator = this.paginator;
            }
          )
        }
      }

    });
  }
  editarUsuario(al:Usuario)
  {
    const refDialog=this.dialog.open(AbmUsuarioComponent,{data:{datosUsr: new Usuario(al.id,al.nombre,al.apellido,al.fechaNacimiento,al.dni,al.correoElectronico,al.telefono,al.sexo,al.direccion,al.rol,al.cursos),
      rolesPermitidos:this.servicioRoles.getRoles(),
      soloLectura:false}});

      refDialog.afterClosed().subscribe(result => {
        let updUsr=this.usuarioService.updateUsuario(result);
        if (updUsr!=null) {
          updUsr.subscribe(
            data => {
              //console.log("data Update",data);
              this.table.renderRows();

              this.listar();
              // this.obtenerUsuarios();

              this.ds.paginator = this.paginator;
            }
          )
        }
      }
    ); 
  }
  eliminarUsuario(al:Usuario)
  { 
    const refDialog=this.dialog.open(ConfirmModalComponent,{data:{titulo:"Eliminar "+this.tipoLista,subTitulo:"¿Esta seguro?"}});

    refDialog.afterClosed().subscribe(result => {
      if(result)
      {
        let delUsr=this.usuarioService.deleteUsuario(al);

        if (delUsr!=null) {
          delUsr.subscribe(
            data => {

              this.table.renderRows();

              this.listar();
              // this.obtenerUsuarios();

              this.ds.paginator = this.paginator;
            }
          )
        }
      }
    });
  }
  verUsuario(al:Usuario)
  {
    const refDialog=this.dialog.open(AbmUsuarioComponent,{data:{datosUsr: new Usuario(al.id,al.nombre,al.apellido,al.fechaNacimiento,al.dni,al.correoElectronico,al.telefono,al.sexo,al.direccion,al.rol,al.cursos),
      rolesPermitidos:this.rol,
      soloLectura:true}});

      refDialog.afterClosed().subscribe(result => {
        let updAl=this.usuarioService.updateUsuario(result);
        if (updAl!=null) {
          updAl.subscribe(
            data => {

            this.table.renderRows();

            this.listar();

            this.ds.paginator = this.paginator;
          }
          )
        }
      }
    ); 
  }
}
