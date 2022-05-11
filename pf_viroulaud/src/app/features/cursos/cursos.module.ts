import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { ListaCursosComponent } from './componentes/lista-cursos/lista-cursos.component';
import { AbmCursoComponent } from './componentes/abm-curso/abm-curso.component';


@NgModule({
  declarations: [
    ListaCursosComponent,
    AbmCursoComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule
  ]
})
export class CursosModule { }
