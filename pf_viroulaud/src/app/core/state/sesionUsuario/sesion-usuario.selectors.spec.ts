import * as fromSesionUsuario from './sesion-usuario.reducer';
import { selectSesionUsuarioState } from './sesion-usuario.selectors';

describe('SesionUsuario Selectors', () => {
  it('should select the feature state', () => {
    const result = selectSesionUsuarioState({
      [fromSesionUsuario.sesionUsuarioFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
