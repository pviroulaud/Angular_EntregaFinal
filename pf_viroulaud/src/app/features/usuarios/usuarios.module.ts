import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { AbmUsuarioComponent } from './componentes/abm-usuario/abm-usuario.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { MaterialModule } from '../../core/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListaUsuariosComponent,
    AbmUsuarioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule, // Se tiene que importar para que funcione el material (deberia quedar automaticamente incluido cuando se incluye el CoreModule, pero (ver abajo)
    //CoreModule, // El CoreModule no se importa porque genera una referencia ciclica porque el CoreModule importa este UsuariosModule
    ReactiveFormsModule,
    SharedModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
