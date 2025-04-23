import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISala } from '../../interface/sala.interface';
import { IPelicula } from 'src/app/modules/peliculas/interface/pelicula.interface';

@Component({
  selector: 'app-sala-form',
  templateUrl: './sala-form.component.html',
  styleUrls: ['./sala-form.component.css']
})
export class SalaFormComponent {
  @Input() peliculas:IPelicula[]=[];

  @Input() set sala(value: ISala | null) {
    if (value) {
      this.formularioSala.patchValue(value);
      this.isEdit=true;
    } else {
      this.formularioSala.reset();
    }
  }
  
  @Output() guardar = new EventEmitter<void>();
  @Output() create = new EventEmitter<void>();
  @Output() update = new EventEmitter<void>();
  @Output() assign = new EventEmitter<void>();

  isEdit:boolean=false;
  formularioSala: FormGroup;

  tiposSala = ['2D', '3D', 'IMAX', '4DX'];
  horarios = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];

  constructor(private fb: FormBuilder) {
    console.log(this.peliculas);
    this.formularioSala = this.fb.group({
      id_sala: [''],
      id_pelicula: [''],
      nombre: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.formularioSala.valid) {
      if(this.isEdit)
        this.update.emit(this.formularioSala.value);
      else
        this.create.emit(this.formularioSala.value);

      this.guardar.emit();
    }
  }
 
  asignarPelicula()
  {
    this.assign.emit(this.formularioSala.value);
  }
}
