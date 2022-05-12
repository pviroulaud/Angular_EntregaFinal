import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Usuario } from './Clases/usuario';
import { selectSesionUsuario } from './state/sesionUsuario/sesion-usuario.selectors';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

  private usuarioLogueado?: Usuario;
  constructor(
    private router:Router,
    private store:Store)
    {
      this.store.select(selectSesionUsuario)
      .subscribe(sesionUsuario=>{

        this.usuarioLogueado=sesionUsuario.usuarioEnSesion;
      })
    }
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.usuarioLogueado==undefined) {
        return this.router.navigate(['login']);
      }
      if(this.usuarioLogueado?.id>0)
      {
        return true;
      }
      else{
        return this.router.navigate(['login']);
      }
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.usuarioLogueado==undefined) {
        return this.router.navigate(['login']);
      }
      if(this.usuarioLogueado?.id>0)
      {
        return true;
      }
      else{
        return this.router.navigate(['login']);
      }
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
