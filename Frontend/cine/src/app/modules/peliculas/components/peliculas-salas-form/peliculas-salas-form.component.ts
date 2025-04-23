import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { IPeliculaSalaCine } from '../../interface/pelicula.interface';

@Component({
  selector: 'app-peliculas-salas-form',
  templateUrl: './peliculas-salas-form.component.html',
  styleUrls: ['./peliculas-salas-form.component.css']
})
export class PeliculasSalasFormComponent {
  @Input() programacion: IPeliculaSalaCine | null = null;
  @Input() peliculas: any[] = [];
  @Input() salas: any[] = [];
  @Output() submitForm = new EventEmitter<IPeliculaSalaCine>();
  
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id_sala_cine: ['', Validators.required],
      id_pelicula: ['', Validators.required],
      fecha_publicacion: ['', Validators.required],
      fecha_fin: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
