import { IPelicula } from "./movie.interface";
import { ISala } from "./sala.interface";

export interface IPeliculaSala {
    id_sala_cine: number;
    id_pelicula: number;
    fecha_publicacion: string;
    fecha_fin: string;
    photourl: string;
    pelicula: IPelicula;
    sala?: ISala;
  }