import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../ServiciosAPI/login.service';
import { Usuario } from '../../Clases/usuario';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private store:Store) { }

  ngOnInit(): void {
  }

  frm:FormGroup=new FormGroup({
    usuario:new FormControl('',[Validators.required]),
    clave: new FormControl('',[Validators.required])
  });

  ingresar()
  {
    //this.router.navigate(['home']);

    if(!this.frm.valid)
    {
      return;
    }
    this.loginService.login(this.frm.value.usuario,this.frm.value.clave).subscribe((data:Usuario)=>{
      if (data)
      {
        // Login valido
        
        
        this.router.navigate(['home']);
      }
      else{
        alert("Usuario o contraseña incorrectos");
      }
    })
  }
}
