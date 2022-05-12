import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { ListaCursosComponent } from './componentes/lista-cursos/lista-cursos.component';
import { AbmCursoComponent } from './componentes/abm-curso/abm-curso.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListaCursosComponent,
    AbmCursoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule, // Se tiene que importar para que funcione el material (deberia quedar automaticamente incluido cuando se incluye el CoreModule, pero (ver abajo)
    //CoreModule, // El CoreModule no se importa porque genera una referencia ciclica porque el CoreModule importa este UsuariosModule
    ReactiveFormsModule,
    SharedModule,
    CursosRoutingModule
  ]
})
export class CursosModule { }
