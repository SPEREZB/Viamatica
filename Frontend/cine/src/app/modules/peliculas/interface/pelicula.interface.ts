import { ISala } from "../../salas/interface/sala.interface";

export interface IPelicula {
    id_pelicula: number;
    nombre: string;
    duracion: number;
    photourl: string;
  }
  
  export interface IPeliculaSalaCine {
    id_sala_cine: number;
    fecha_publicacion: Date;
    fecha_fin: Date;
    id_pelicula: number;
    photourl: string;
    pelicula: IPelicula;
    sala?: ISala;
  }