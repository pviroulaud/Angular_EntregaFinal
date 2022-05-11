import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/core/Clases/usuario';
import { UsuarioService } from 'src/app/core/ServiciosAPI/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios$?: Observable<Usuario[]>;
  suscripcion: any;
  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar()
  {
    this.usuarios$ = this.usuarioService.getUsuarios();
    this.suscripcion = this.usuarios$.subscribe(
      (usuarios) => {
        console.log(usuarios);
      }
    );
  }

}
