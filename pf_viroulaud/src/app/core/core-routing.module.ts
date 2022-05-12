import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';

const routes: Routes = [

  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},    
  
  {path:'home' ,redirectTo:'/home/usuarios/us',pathMatch: 'full'},

  {path: 'home', component: HomeComponent, canActivate: [AuthGuard],  
  children: [
      {path:'usuarios/:tipo', loadChildren: () => import('../features/usuarios/usuarios.module').then((m) => m.UsuariosModule)},
      {path:'cursos', loadChildren: () => import('../features/cursos/cursos.module').then((m) => m.CursosModule)},
  ]}  
  ,
  {path: '**', component: NotFoundComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
