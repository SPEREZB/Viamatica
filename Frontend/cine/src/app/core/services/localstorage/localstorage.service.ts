import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  /**
   * Guarda un valor en el localStorage
   * @param key - La clave bajo la cual se almacenará el valor
   * @param value - El valor que se almacenará (puede ser cualquier tipo de dato)
   */
  setItem(key: string, value: any): void {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error al guardar en localStorage', error);
    }
  }

  /**
   * Obtiene un valor del localStorage
   * @param key - La clave bajo la cual se almacenó el valor
   * @returns El valor almacenado (o `null` si no existe)
   */
  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error al obtener el valor de localStorage', error);
      return null;
    }
  }
}
