import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../ServiciosAPI/login.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {


  constructor(private router: Router,
    private loginService:LoginService) { }

  ngOnInit(): void {
  }
  cerrarSesion()
  {
    this.loginService.cerrarSesion()
    this.router.navigate(['login']);
  }
}
