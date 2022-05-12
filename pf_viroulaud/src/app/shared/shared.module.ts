import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetEdadPipe } from './pipes/get-edad.pipe';
import { TituloDirective } from './directivas/titulo.directive';
import { ApellidonombrePipe } from './pipes/apellidonombre.pipe';



@NgModule({
  declarations: [
    GetEdadPipe,
    TituloDirective,
    ApellidonombrePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ApellidonombrePipe,
    GetEdadPipe,
    TituloDirective
  ]
})
export class SharedModule { }
