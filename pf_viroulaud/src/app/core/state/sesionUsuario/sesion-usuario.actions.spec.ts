import * as fromSesionUsuario from './sesion-usuario.actions';

describe('loadSesionUsuarios', () => {
  it('should return an action', () => {
    expect(fromSesionUsuario.loadSesionUsuarios().type).toBe('[SesionUsuario] Load SesionUsuarios');
  });
});
