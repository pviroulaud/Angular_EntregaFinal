import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Usuario } from '../../Clases/usuario';
import { LoginService } from '../../ServiciosAPI/login.service';
import { selectSesionUsuario } from '../../state/sesionUsuario/sesion-usuario.selectors';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

  usr!:Usuario;
  
  constructor(
    private router: Router,
    private loginService:LoginService,
    private store:Store) { }

  ngOnInit(): void {
    this.store.select(selectSesionUsuario)
      .subscribe(sesionUsuario=>{        
        this.usr=sesionUsuario.usuarioEnSesion;
      })
  }
  cerrarSesion()
  {
    this.loginService.cerrarSesion()
    this.router.navigate(['login']);
  }
}
