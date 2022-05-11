import { Curso } from "./curso";
export interface iUsuario
{
    id:number,nombre:string,
    apellido:string,
    fechaNacimiento:Date,
    dni:number,
    correoElectronico:string,
    telefono:number,
    sexo:string,
    direccion:string,
    rol:number,
    cursos:Curso[],
    pass:string,
    activo:boolean,
    setContraseña(pass:string):void
}

export class Usuario implements iUsuario
{
    cursos:Curso[]=[];
    
    id:number=0;
    nombre:string="Al";
    apellido:string="Ape";
    fechaNacimiento:Date=new Date("01/01/2022");
    dni:number=0;
    correoElectronico:string="";
    telefono:number=0;
    sexo:string="";
    direccion:string="";
    rol:number=4;
    pass:string="123";
    activo:boolean=true;

    constructor(id:number,nombre:string,
    apellido:string,
    fechaNacimiento:Date,
    dni:number,
    correoElectronico:string,
    telefono:number,
    sexo:string,
    direccion:string,
    rol:number,
    cursos?:Curso[])
    {
        this.id=id;
        this.nombre=nombre;
        this.apellido=apellido;
        this.fechaNacimiento=fechaNacimiento ;
        this.dni=dni;
        this.correoElectronico=correoElectronico;
        this.telefono=telefono;
        this.sexo=sexo;
        this.direccion=direccion
        this.rol=rol;
        if (cursos!=null) {
            this.cursos=cursos;
        }
        else{
            
            this.cursos=[];
        }
    }

    setContraseña(pass:string)
    {
        this.pass=pass;
    }
}