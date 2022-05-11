import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { AbmUsuarioComponent } from './componentes/abm-usuario/abm-usuario.component';


@NgModule({
  declarations: [
    ListaUsuariosComponent,
    AbmUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
