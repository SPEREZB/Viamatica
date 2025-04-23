import { Injectable } from '@angular/core';
import { IPelicula, IPeliculaSalaCine } from '../../interface/pelicula.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { API } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private api = API;

  constructor(private http: HttpClient) { }

  // Operaciones básicas de películas
  getPeliculas(): Observable<IPelicula[]> {
    return this.http.get<IPelicula[]>(`${this.api}/peliculas`);
  }
  getAllPeliculasSalaCine(): Observable<IPeliculaSalaCine[]> {
    return this.http.get<IPeliculaSalaCine[]>(`${this.api}/pelicula_salacine`);
  }

  createPelicula(pelicula: Omit<IPelicula, 'id_pelicula'>): Observable<IPelicula> {
    return this.http.post<IPelicula>(`${this.api}/peliculas`, pelicula);
  }

  createProgramacion(programacion: Omit<IPeliculaSalaCine, 'id_pelicula' | 'id_sala_cine'>): Observable<IPeliculaSalaCine> {
    return this.http.post<IPeliculaSalaCine>(
      `${this.api}/pelicula_salacine`,
      programacion
    ).pipe(
      catchError(error => {
        console.error('Error en createProgramacion:', error);
        return throwError(() => new Error('Error al crear la programación'));
      })
    );
  }

  // Operaciones de programación en salas
  getProgramaciones(): Observable<IPeliculaSalaCine[]> {
    return this.http.get<IPeliculaSalaCine[]>(`${this.api}/pelicula_salacine`);
  }

  programarPelicula(programacion: Omit<IPeliculaSalaCine, 'id_pelicula'>): Observable<IPeliculaSalaCine> {
    return this.http.post<IPeliculaSalaCine>(`${this.api}/programaciones`, programacion);
  }

  updateProgramacion(id_sala_cine: number, id_pelicula: number, programacion:any): Observable<void> {
    return this.http.put<void>(
      `${this.api}/pelicula_salacine/update/${id_sala_cine}/${id_pelicula}`,programacion
    );
  }
  deleteProgramacion(id_sala_cine: number, id_pelicula: number): Observable<void> {
    return this.http.delete<void>(
      `${this.api}/pelicula_salacine/${id_sala_cine}/${id_pelicula}`
    );
  }
}
