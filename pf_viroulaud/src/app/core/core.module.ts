import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { TitleBarComponent } from './componentes/title-bar/title-bar.component';
import { ConfirmModalComponent } from './componentes/confirm-modal/confirm-modal.component';
import { CursosModule } from '../features/cursos/cursos.module';
import { UsuariosModule } from '../features/usuarios/usuarios.module';
import { reducer, sesionUsuarioFeatureKey } from './state/sesionUsuario/sesion-usuario.reducer';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './ServiciosAPI/login.service';
//import { EffectsModule } from '@ngrx/effects';
//import { SesionUsuarioEffects } from './state/sesionUsuario/sesion-usuario.effects';
import { UsuarioService } from './ServiciosAPI/usuario.service';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    MenuComponent,
    NotFoundComponent,
    TitleBarComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,    
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    UsuariosModule,
    CursosModule,
    CoreRoutingModule,
    StoreModule.forFeature(sesionUsuarioFeatureKey, reducer)
    //EffectsModule.forFeature([SesionUsuarioEffects])
  ],
  providers:[LoginService,UsuarioService]
})
export class CoreModule { }
