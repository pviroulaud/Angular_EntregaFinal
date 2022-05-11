import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth.guard';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';

const routes: Routes = [

  {path: '',component:ListaUsuariosComponent,canActivate: [AuthGuard],
    children: [
                {
                  path:'lista', component:ListaUsuariosComponent,canActivate: [AuthGuard]
                }
              ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
