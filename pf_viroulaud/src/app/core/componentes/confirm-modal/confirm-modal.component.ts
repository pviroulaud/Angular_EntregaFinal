import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  titulo:string="";
  subTitulo:string="¿Esta seguro?";
  constructor(public refDialog: MatDialogRef<ConfirmModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any) {
  
    this.titulo=data.titulo;
    if (data.subTitulo!=undefined)
    {
      this.subTitulo=data.subTitulo;
    }
  }

  ngOnInit(): void {
  }

  confirma()
  {
    this.refDialog.close(true);
  }
  cerrar()
  {
    this.refDialog.close(false);
  }
}  
