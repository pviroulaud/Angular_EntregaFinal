import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Curso } from 'src/app/core/Clases/curso';
import { Usuario } from 'src/app/core/Clases/usuario';
import { CursoService } from 'src/app/core/ServiciosAPI/curso.service';
import { UsuarioService } from 'src/app/core/ServiciosAPI/usuario.service';

@Component({
  selector: 'app-abm-usuario',
  templateUrl: './abm-usuario.component.html',
  styleUrls: ['./abm-usuario.component.css']
})
export class AbmUsuarioComponent implements OnInit {

  usuario:Usuario=new Usuario(0,"","",new Date(),0,"",0,"","",1,undefined);
  
  titulo:string="Editar";
  fechaMaxima:string="";
  edita:boolean=true;
  roles:any[]=[];
  soloLectura:boolean=false;
  cursosDisponibles:Curso[]=[];
  

  frm:FormGroup=new FormGroup({
    legajo:new FormControl(''),
    nombre: new FormControl('',[Validators.required,Validators.minLength(3)]),
    apellido: new FormControl('',[Validators.required,Validators.minLength(3)]),
    sexo:new FormControl('0',Validators.required),
    fechaNac: new FormControl(new Date(),Validators.required),
    edad: new FormControl(0),
    dni:new FormControl('',[Validators.required,Validators.min(1000000),Validators.max(99999999)]),
    email:new FormControl('',[Validators.required,Validators.pattern(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)]),
    telefono:new FormControl(''),
    direccion:new FormControl('',Validators.required),
    rol:new FormControl('1',Validators.required),
    cursos:new FormControl('0')
  });
  
  constructor(
    private servicioCursos:CursoService, 
    private servicioUsuario:UsuarioService,
    public refDialog: MatDialogRef<AbmUsuarioComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:{datosUsr:Usuario,rolesPermitidos:any[],soloLectura:boolean}) {
      if (data.datosUsr.id==0)
      {
        this.titulo="Nuevo";
        this.edita=false;
      }
      else{
        this.titulo="Editar";
        this.edita=true;
      }
        this.usuario=data.datosUsr;
        this.roles=data.rolesPermitidos;
        this.soloLectura=data.soloLectura;
     }

  ngOnInit(): void {
    this.servicioCursos.getCursosPromise().then(cursos=>{
      this.cursosDisponibles=cursos;
    });

    let hoy:Date=new Date();
    let dia:string="";
    let mes:string="";
    if (hoy.getDate() >= 10) {
      dia = hoy.getDate().toString();
    }
    else{
      dia = '0' + hoy.getDate().toString();
    }
    if ((hoy.getMonth()+1) >= 10) {
      mes = (hoy.getMonth()+1).toString();
    }
    else{
      mes = '0' + (hoy.getMonth()+1).toString();
    }
    this.fechaMaxima=(hoy.getFullYear()-1).toString()+'-'+mes+'-'+dia  
  }
  agregarCurso(){

    let c= this.cursosDisponibles.filter(x=>x.id==this.frm.value.cursos);
    this.usuario.cursos.push(c[0]);

    return false;
  }
  quitarCurso(alumnoId:number,cursoId:number){

    this.usuario.cursos.splice(this.usuario.cursos.findIndex(x=>x.id==cursoId),1);

  }

  aplicar()
  {
    
    if (this.frm.valid)
    {
      this.refDialog.close(this.usuario);
    }        
  }
}
