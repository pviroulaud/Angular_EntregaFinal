import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Usuario } from '../Clases/usuario';
import { API_URL } from './baseURL';
import { Store } from '@ngrx/store';
import { loadSesionUsuarios, clearSesionUsuarios } from '../state/sesionUsuario/sesion-usuario.actions';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usuarioLogueado?: Usuario;
  private sesionActiva = false;
  private rolActivo:number=0;

  constructor(
    private http:HttpClient,
    private store:Store
  ) { }

  private manejoError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.warn('Error en el frontend:', error.error.message)
    }else{
      console.warn('Error en el backend', error.status, error.message)
    }

    return throwError(() => 'Error de comunicación HTTP');
    
  }

  login(correo: string, contrasena: string):Observable<Usuario>{

  return this.http.get<Usuario[]>(`${API_URL}/usuario`).pipe(
    map((usuarios: Usuario[]) => {
      this.usuarioLogueado = usuarios.filter(usuario => usuario.correoElectronico === correo && usuario.pass === contrasena)[0]
     
      //console.log("loginService.login",this.usuarioLogueado);
        this.store.dispatch(loadSesionUsuarios({sesionUsuario:this.usuarioLogueado}));
      return this.usuarioLogueado;
    })
  ).pipe(catchError(this.manejoError))
  };

  cerrarSesion(){
    
    this.usuarioLogueado = undefined;
    this.store.dispatch(clearSesionUsuarios());
    this.sesionActiva = false;
    this.rolActivo = 0;
  }

  obtenerUsuarioActual(){
    return this.usuarioLogueado;
  }

  obtenerSesionActiva(){
    return this.sesionActiva;
  }
  obtenerRolActivo(){
    return this.rolActivo;
  }
}