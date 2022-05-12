import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth.guard';
import { ListaCursosComponent } from './componentes/lista-cursos/lista-cursos.component';

const routes: Routes = [
  {path: '',component:ListaCursosComponent,canActivate: [AuthGuard],
    children: [
                {
                  path:'lista', component:ListaCursosComponent,canActivate: [AuthGuard]
                }
              ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
