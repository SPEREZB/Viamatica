import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { IPeliculaSalaCine } from '../../interface/pelicula.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-peliculas-form',
  templateUrl: './peliculas-form.component.html',
  styleUrls: ['./peliculas-form.component.css']
})
export class PeliculasFormComponent {
  peliculaForm: FormGroup;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PeliculasFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = !!data?.pelicula;
    this.peliculaForm = this.fb.group({
      nombre: [data?.pelicula?.nombre || '', Validators.required],
      duracion: [data?.pelicula?.duracion || '', Validators.required],
      photourl: [data?.pelicula?.photourl || ''],
    });
  }

  guardar() {
    if (this.peliculaForm.valid) {
      this.dialogRef.close(this.peliculaForm.value);
    }
  }

  cerrar() {
    this.dialogRef.close();
  }
}
