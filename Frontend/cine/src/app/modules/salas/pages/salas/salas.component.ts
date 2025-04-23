import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISala } from '../../interface/sala.interface';
import { SalasService } from '../../services/salas.service';
import { PeliculasService } from 'src/app/modules/peliculas/services/peliculas/peliculas.service';
import { IPelicula } from 'src/app/modules/peliculas/interface/pelicula.interface';
import { ToastrService } from 'ngx-toastr';
 

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent {

  mostrarFormulario = false;
  salaEditar: any = null;
  salas: any = null;
  peliculas: IPelicula[]=[];

  
  constructor(private salaService:SalasService, private peliculaService:PeliculasService, private toast:ToastrService) {
    this.getAllSalas();
    this.getAllPeliculas();
  }

  getAllSalas()
  {
      this.salaService.getAllSalas().subscribe((response)=>
      {
        this.salas= response;
      })
  }

  getAllPeliculas()
  {
      this.peliculaService.getPeliculas().subscribe((response)=>
      {
        this.peliculas= response;
      })
  }

  toggleFormulario(sala?: any): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.salaEditar = sala || null;
    this.getAllPeliculas();

   
  }
 
  createSalas(sala:any)
  {
    this.salaService.crearSala(sala).subscribe((response)=>
    { 
      this.getAllSalas();
      this.toast.success('Sala creada correctamente'); 

    })
  }
 
  updateSalas(sala:any)
  {
    this.salaService.actualizarSala(sala.id_sala, sala).subscribe((response)=>
    { 
      this.getAllSalas();
      this.toast.success('Sala actualizada correctamente'); 
      
    })
  }
 
  assignMovie(sala:any)
  {
    this.peliculaService.updateProgramacion(sala.id_sala,sala.id_pelicula, sala).subscribe((response)=>
    { 
      this.getAllSalas();
      this.toast.success('Película asignada correctamente'); 

    })
  }

  @Output() editar = new EventEmitter<ISala>();

  eliminarSala(id: number): void {
    
  }
}
