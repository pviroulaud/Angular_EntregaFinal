// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, map, concatMap } from 'rxjs/operators';
// import { Observable, EMPTY, of } from 'rxjs';

// import * as SesionUsuarioActions from './sesion-usuario.actions';



// @Injectable()
// export class SesionUsuarioEffects {

//   loadSesionUsuarios$ = createEffect(() => {
//     return this.actions$.pipe( 

//       ofType(SesionUsuarioActions.loadSesionUsuarios),
//       concatMap(() =>
//         /** An EMPTY observable only emits completion. Replace with your own observable API request */
//         EMPTY.pipe(
//           map(data => SesionUsuarioActions.loadSesionUsuariosSuccess({ data })),
//           catchError(error => of(SesionUsuarioActions.loadSesionUsuariosFailure({ error }))))
//       )
//     );
//   });



//   constructor(private actions$: Actions) {}

// }
