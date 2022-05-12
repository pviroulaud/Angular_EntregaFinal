import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Curso } from '../Clases/curso';
import { Usuario } from '../Clases/usuario';
import { API_URL } from './baseURL';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http:HttpClient
  ) { }

  private manejoError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.warn('Error en el frontend:', error.error.message)
    }else{
      console.warn('Error en el backend', error.status, error.message)
    }

    return throwError(() => 'Error de comunicación HTTP');
    
  }

  /* Con Promesas */
  getUsuarioPorId(id:number) {
    let p = new Promise<Usuario[]>((resolve, reject) => {
      const error = false;

      this.http.get<Usuario[]>(`${API_URL}/usuario`)
      .subscribe(
        (data) => {
          resolve(data.filter(usuario => usuario.id == id));
        }
      );
    });

    return p;
  }

  getUsuariosPorRolPromise(rolId:number) {

    let p = new Promise<Usuario[]>((resolve, reject) => {
      const error = false;

      this.http.get<Usuario[]>(`${API_URL}/usuario`)
      .subscribe(
        (data) => {
          
          resolve(data.filter(usuario => usuario.rol == rolId));
        }
      );
    });

    return p;
  }
  /************* */
  asignarCurso(al:Usuario,cur:Curso){
    if ((al!=undefined)&&(cur!=undefined))
    {
    al.cursos.push(cur);
    }
  }
  desasignarCurso(al:Usuario,cur:Curso){
    if ((al!=undefined)&&(cur!=undefined))
    {
    al.cursos.splice(al.cursos.findIndex(x=>x.id==cur.id),1);
    }
  }
  
  getUsuarios():Observable<Usuario[]>{

    return this.http.get<Usuario[]>(`${API_URL}/usuario`).pipe(catchError(this.manejoError));    
  }

  addUsuario(al:Usuario) {
    if (al!=undefined)
    {
    return this.http.post(`${API_URL}/usuario`, al);
    }
    else
    {
      return null;
    }
  }



  deleteUsuario(al:Usuario){
    if (al!=undefined)
    {
      return this.http.delete(`${API_URL}/usuario/${al.id}`)

    }
    else
    {
      return null;
    }
  }
  deleteUsuarioId(id:number){
    return this.http.delete(`${API_URL}/usuario/${id}`)
  }

  updateUsuario(al:Usuario){
    if (al!=undefined)
    {
      //console.log("updateUsuario",al);
      return this.http.put(`${API_URL}/usuario/${al.id}`, al)
    }
    else
    {
      return null;
    }
  }
}