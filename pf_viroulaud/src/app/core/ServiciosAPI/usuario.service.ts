import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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
  getUsuarios():Observable<Usuario[]>{

    return this.http.get<Usuario[]>(`${API_URL}/usuario`).pipe(catchError(this.manejoError));    
    }
}