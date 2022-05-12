import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Curso } from 'src/app/core/Clases/curso';
import { Usuario } from 'src/app/core/Clases/usuario';
import { ConfirmModalComponent } from 'src/app/core/componentes/confirm-modal/confirm-modal.component';
import { CursoService } from 'src/app/core/ServiciosAPI/curso.service';
import { LoginService } from 'src/app/core/ServiciosAPI/login.service';
import { UsuarioService } from 'src/app/core/ServiciosAPI/usuario.service';
import { selectSesionUsuario } from 'src/app/core/state/sesionUsuario/sesion-usuario.selectors';
import { AbmCursoComponent } from '../abm-curso/abm-curso.component';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css']
})
export class ListaCursosComponent implements OnInit {
  @ViewChild(MatTable, {static: true}) table!: MatTable<any>;
  dataSource:any;
  rolActivo:number=0;
  listaAlumnosCurso:Usuario[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  
  nombreColumnas:string[]=["id","nombre","descripcion","totalClases","profesor","editar"];
  listaCur: Curso[]=[];

  constructor(
    public dialog:MatDialog, 
    private servicioCurso:CursoService, 
    private servicioUsuario:UsuarioService,
    private store: Store) { }


  ngOnInit(): void {
    this.store.select(selectSesionUsuario)
      .subscribe(sesionUsuario=>{        
        this.rolActivo=sesionUsuario.usuarioEnSesion.rol;
      });

    this.obtenerCursos();
    this.dataSource= new MatTableDataSource<Curso>(this.listaCur);
  }



  listarAlumnos(cur:Curso)
  {
    this.servicioUsuario.getUsuariosPorRolPromise(1).then(res=>{
      this.listaAlumnosCurso=[];
      for (let i = 0; i < res.length; i++) {
        for(let j=0;j<res[i].cursos.length;j++)
        {
          if(res[i].cursos[j].id==cur.id)
          {
            this.listaAlumnosCurso.push(res[i]);
          }
        }        
      }

      

      this.servicioUsuario.getUsuariosPorRolPromise(2).then((data)=>{
        const refDialog=this.dialog.open(AbmCursoComponent,{data:{datosCurso: new Curso(cur.id,cur.nombre,cur.descripcion,cur.cupo,cur.totalClases,cur.totalClases,cur.fechaInicio,cur.profesorId),
                                                                  profesores:data,
                                                                  listaAlumnos:this.listaAlumnosCurso,
                                                                  soloLectura:true}});
        refDialog.afterClosed().subscribe(result => {
        let cur=  this.servicioCurso.updateCursoPromise(result)
        if (cur!=null)
        {
          cur.then((datos)=>{
            
            this.obtenerCursos();
  
            this.dataSource.paginator = this.paginator;
          })
        }    
        });    
      });


    });

  }
  obtenerCursos(){
    
    this.servicioCurso.getCursosPromise().then((data)=>{
      for (let i = 0; i < data.length; i++) {
        this.servicioUsuario.getUsuarioPorId(data[i].profesorId).then((data2)=>{
          if (data2.length>0)
          {
            data[i].profesor=data2[0];
          }
        });
      }
    
      //console.log("CURSOS",data);
      this.cargarGrilla(data);
    })
    .catch((err)=>{
      //console.log(err);
    });

    //this.listaCur=this.servicioCurso.getCursos();
  }

  cargarGrilla(datosGrilla:Curso[])
  {
    this.listaCur=datosGrilla;
    this.dataSource= new MatTableDataSource<Curso>(this.listaCur);
    this.table.renderRows();

    this.dataSource.paginator = this.paginator;
  }
  altaCurso()
  {
    this.servicioUsuario.getUsuariosPorRolPromise(2).then((data)=>{
      const refDialog=this.dialog.open(AbmCursoComponent,{data:{datosCurso:new Curso(0,"","",0,0,0,new Date(),0),
                                                                profesores:data,
                                                                listaAlumnos:[],
                                                                soloLectura:false}});
      
      refDialog.afterClosed().subscribe(result => {
      if(result!=null)
      {
      this.servicioCurso.addCursoPromise(result)
      .then((datos)=>{

      this.obtenerCursos();

      this.dataSource.paginator = this.paginator;
      })
      }
      });
    });

    
  }
  editarCurso(cur:Curso){
    this.servicioUsuario.getUsuariosPorRolPromise(1).then(res=>{
      this.listaAlumnosCurso=[];
      for (let i = 0; i < res.length; i++) {
        for(let j=0;j<res[i].cursos.length;j++)
        {
          if(res[i].cursos[j].id==cur.id)
          {
            this.listaAlumnosCurso.push(res[i]);
          }
        }        
      }

      this.servicioUsuario.getUsuariosPorRolPromise(2).then((data)=>{
        const refDialog=this.dialog.open(AbmCursoComponent,{data:{datosCurso: new Curso(cur.id,cur.nombre,cur.descripcion,cur.cupo,cur.totalClases,cur.totalClases,cur.fechaInicio,cur.profesorId),
                                                                  profesores:data,
                                                                  listaAlumnos:this.listaAlumnosCurso,
                                                                  soloLectura:false}});
        refDialog.afterClosed().subscribe(result => {
        let cur=  this.servicioCurso.updateCursoPromise(result)
        if (cur!=null)
        {
          cur.then((datos)=>{
            
            this.obtenerCursos();

            this.dataSource.paginator = this.paginator;
          })
        }    
        });    
      });

  });

  }
  eliminarCurso(cur:Curso){
    const refDialog=this.dialog.open(ConfirmModalComponent,{data:{titulo:"Eliminar Curso",subTitulo:"¿Esta seguro?"}});

    refDialog.afterClosed().subscribe(result => {
      if(result)
      {
        this.servicioCurso.deleteCursoPromise(cur)
        .then((datos)=>{

          this.obtenerCursos();

          this.dataSource.paginator = this.paginator;
        })
      }
    });
  }

}
