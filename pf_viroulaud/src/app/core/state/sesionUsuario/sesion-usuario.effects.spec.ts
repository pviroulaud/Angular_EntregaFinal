import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SesionUsuarioEffects } from './sesion-usuario.effects';

describe('SesionUsuarioEffects', () => {
  let actions$: Observable<any>;
  let effects: SesionUsuarioEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SesionUsuarioEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SesionUsuarioEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
