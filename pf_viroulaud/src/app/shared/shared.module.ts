import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetEdadPipe } from './pipes/get-edad.pipe';



@NgModule({
  declarations: [
    GetEdadPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
