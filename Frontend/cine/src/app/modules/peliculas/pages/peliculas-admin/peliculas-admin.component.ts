import { Component } from '@angular/core';
import { IPelicula, IPeliculaSalaCine } from '../../interface/pelicula.interface';
import { PeliculasService } from '../../services/peliculas/peliculas.service';
import { forkJoin } from 'rxjs';
import { PeliculasFormComponent } from '../../components/peliculas-form/peliculas-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-peliculas-admin',
  templateUrl: './peliculas-admin.component.html',
  styleUrls: ['./peliculas-admin.component.css']
})
export class PeliculasAdminComponent {
  peliculas: IPelicula[] = [];
  programaciones: IPeliculaSalaCine[] = [];
  salas: any[] = [];
  activeTab: 'peliculas' | 'programaciones' = 'peliculas';
  loading = true;

  constructor(
    private peliculaService: PeliculasService,
    private toast: ToastrService, 
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.getAllPeliculas(); 
  }
 
  changeTab(item:any)
  {
      this.activeTab= item;
      if(item=="programaciones")
         this.getAllProgramaciones();
        else 
          this.getAllPeliculas();
  }

  getAllProgramaciones()
  {
    this.peliculaService.getAllPeliculasSalaCine().subscribe((response)=>
    {
      this.programaciones= response;
    })
  }

  getAllPeliculas()
  {
    this.peliculaService.getPeliculas().subscribe((response)=>
    {
      this.peliculas = response;
    })
  }

  editarPeliculaSala(pelicula:IPeliculaSalaCine)
  {

  }

  confirmDeletePeliculaSala(pelicula:IPeliculaSalaCine)
  {

  } 
  confirmDeletePelicula(pelicula:IPelicula)
  {

  }

  getPeliculaNombre(idPelicula: number): string {
    const pelicula = this.peliculas.find(p => p.id_pelicula === idPelicula);
    return pelicula ? pelicula.nombre : 'Desconocida';
  }

  // Método para obtener nombre de sala
  getSalaNombre(idSala: number): string {
    const sala = this.salas.find(s => s.id_sala === idSala);
    return sala ? sala.nombre : 'Desconocida';
  }

  editarProgramacion(programacion: IPeliculaSalaCine): void {
    const dialogRef = this.dialog.open(PeliculasFormComponent, {
      width: '600px',
      data: {
        programacion,
        peliculas: this.peliculas,
        salas: this.salas
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProgramaciones();
      }
    });
  }
  openProgramacionDialog(): void {
    const dialogRef = this.dialog.open(PeliculasFormComponent, {
      width: '600px',
      disableClose: true,  
      data: {
        peliculas: this.peliculas,
        salas: this.salas,
        programacion: null  
      },
      panelClass: 'custom-dialog-container'
    });
  
    dialogRef.afterClosed().subscribe((result: IPeliculaSalaCine | undefined) => {
      if (result) {
        this.guardarNuevaProgramacion(result);
      }
    });
  }

  crearPelicula() {
    const dialogRef = this.dialog.open(PeliculasFormComponent, {
      width: '500px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí podrías llamar a tu servicio para guardar la película nueva
        console.log('Película creada:', result);
      }
    });
  }

  editarPelicula(pelicula: any) {
    const dialogRef = this.dialog.open(PeliculasFormComponent, {
      width: '600px',
      disableClose: true,
      backdropClass: 'dialog-backdrop', 
      panelClass: 'dialog-panel',       
      data: { pelicula }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí podrías actualizar la película en tu backend
        console.log('Película actualizada:', result);
      }
    });
  }

  private guardarNuevaProgramacion(nuevaProgramacion: Omit<IPeliculaSalaCine, 'id_pelicula' | 'id_sala_cine'>): void {
    this.loading = true;
    this.peliculaService.createProgramacion(nuevaProgramacion).subscribe({
      next: () => {
        this.loadProgramaciones();
       this.toast.success('Programación creada correctamente'); 
      },
      error: (err) => {
        console.error('Error al crear programación:', err);
        this.toast.error('Error al crear programación'); 
        this.loading = false;
      }
    });
  }
 
  confirmDeleteProgramacion(programacion: IPeliculaSalaCine): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Eliminar Programación',
        message: `¿Está seguro de eliminar la programación de ${this.getPeliculaNombre(programacion.id_pelicula)} en ${this.getSalaNombre(programacion.id_sala_cine)}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProgramacion(programacion);
      }
    });
  } 
  private deleteProgramacion(programacion: IPeliculaSalaCine): void {
    this.peliculaService.deleteProgramacion(
      programacion.id_sala_cine, 
      programacion.id_pelicula
    ).subscribe({
      next: () => {
        this.loadProgramaciones();
      },
      error: () => {
      }
    });
  }

  private loadProgramaciones(): void {
    this.loading = true;
    this.peliculaService.getProgramaciones().subscribe({
      next: (programaciones) => {
        this.programaciones = programaciones;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
