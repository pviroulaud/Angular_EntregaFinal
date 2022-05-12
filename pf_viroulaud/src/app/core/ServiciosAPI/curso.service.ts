import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Curso } from '../Clases/curso';
import { API_URL } from './baseURL';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private http:HttpClient) { }

  private manejoError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.warn('Error en el frontend:', error.error.message)
    }else{
      console.warn('Error en el backend', error.status, error.message)
    }

    return throwError(() => 'Error de comunicación HTTP');
    
  }

  getCursosPromise(){  
    let p = new Promise<Curso[]>((resolve, reject) => {
      const error = false;

      this.http.get<Curso[]>(`${API_URL}/curso`, {
        headers: new HttpHeaders({
          'content-type': 'application/json'
        })
      })
      .subscribe(
        (data) => {
          
          resolve(data);
          //this.listaCur = data;
        }
      );
    });

    return p;
  }

  addCursoPromise(cur: Curso) {
    let p = new Promise<any>((resolve, reject) => {
      const error = false;

      this.http.post(`${API_URL}/curso`, cur)
      .subscribe(
        (data:any) => {
          resolve(data);
          //this.listaCur = data;
        }
      );

    });

    return p;
  }  
  updateCursoPromise(cur: Curso) {
    if (cur!=null)
    {
      let p = new Promise<any>((resolve, reject) => {
        const error = false;
  
        this.http.put(`${API_URL}/curso/${cur.id}`, cur)
        .subscribe(
          (data:any) => {
            resolve(data);
          }
        );    
      });    
      return p;
    } 
    else{
      return null;
    }
    
  }


  deleteCursoPromise(cur: Curso) {
    let p = new Promise<any>((resolve, reject) => {
      const error = false;

      this.http.delete(`${API_URL}/curso/${cur.id}`)
      .subscribe(
        (data:any) => {
          resolve(data);

        }
      );

    });

    return p;
  }  
}
