import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSesionUsuario from './sesion-usuario.reducer';

export const selectSesionUsuarioState = createFeatureSelector<fromSesionUsuario.State>(
  fromSesionUsuario.sesionUsuarioFeatureKey
);

export const selectSesionUsuario = createSelector(
  selectSesionUsuarioState,
  (state: fromSesionUsuario.State) => {
    return state;
  }
);