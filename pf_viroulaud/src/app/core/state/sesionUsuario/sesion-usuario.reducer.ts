import { Action, createReducer, on } from '@ngrx/store';
import * as SesionUsuarioActions from './sesion-usuario.actions';
import { iUsuario, Usuario } from '../../Clases/usuario';

export const sesionUsuarioFeatureKey = 'sesionUsuario';

export interface State {
  usuarioEnSesion:iUsuario
}

export const initialState: State = {
  usuarioEnSesion : new Usuario(0,"","",new Date("01/01/1900"),0,"",0,"1","",0)
};

export const reducer = createReducer(
  initialState,

  on(SesionUsuarioActions.loadSesionUsuarios, (state, {sesionUsuario}) => {
    // let objeto = estado;
        // objeto.cargando = true;
        // return objeto;
        // Son equivalentes con este codigo
    // let obj= state;
    // return obj;
    console.log(sesionUsuario)
    return {...state, usuarioEnSesion: sesionUsuario}
  }),
  on(SesionUsuarioActions.clearSesionUsuarios,(state) => {
    return initialState;
  })
);
