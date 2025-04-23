import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ISala } from '../../interface/sala.interface';
import { SalasService } from '../../services/salas.service';

@Component({
  selector: 'app-sala-list',
  templateUrl: './sala-list.component.html',
  styleUrls: ['./sala-list.component.css']
})
export class SalaListComponent {
  @Input() salas: ISala[] = [];
  
  @Output() editar = new EventEmitter<ISala>();

  constructor(private salaService:SalasService) {}

  ngOnInit()  {
   //   this.getAllSalas();
  }


  getAllSalas()
  {
      this.salaService.getAllSalas().subscribe((response)=>
      {
        this.salas= response;
      })
  }

 

  eliminarSala(id: number): void {
    console.log('Eliminar sala:', id);
  }
}
