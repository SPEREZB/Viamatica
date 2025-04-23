import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { ISala } from '../interface/sala.interface';
import { API } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class SalasService {
  private api = API;


  constructor(private http: HttpClient) { }

  getAllSalas(): Observable<ISala[]> {
    return this.http.get<ISala[]>(this.api+"/salas");
  }

  crearSala(sala: ISala): Observable<ISala> {
    return this.http.post<ISala>(this.api+"/salas", sala);
  }

  actualizarSala(id: number, sala: ISala): Observable<ISala> {
    return this.http.put<ISala>(this.api+`/salas/${id}`, sala);
  }

  eliminarSala(id: number): Observable<void> {
    return this.http.delete<void>(this.api+`/salas/${id}`);
  }
}