import { createAction, props } from '@ngrx/store';
import { iUsuario } from '../../Clases/usuario';

export const loadSesionUsuarios = createAction(
  '[SesionUsuario] Load SesionUsuarios',
  props<{ sesionUsuario: iUsuario }>()
);

export const clearSesionUsuarios = createAction(
  '[SesionUsuario] Clear SesionUsuarios ',
);