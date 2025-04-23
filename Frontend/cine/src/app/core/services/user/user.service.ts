import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from 'src/config';
import { PersonForm } from '../../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class UserService { 
  api= API;
  
  constructor(private http: HttpClient) {}
 
  verifyUser(user: any): Observable<any> {
    return this.http.post(this.api+"api/verifyUser", user);
  } 
  getUsers(page: number, size: number): Observable<{ users: any, total: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<{ users: any, total: number }>(`${this.api+"api/getUsers"}`, { params });
  }
  createUser(user: any): Observable<any> {
    return this.http.post(this.api+"api/createUser", user);
  }
  readUser(): Observable<any> {
    return this.http.get(this.api+"api/readUser");
  }
  readUserById(id: any): Observable<any> {
    return this.http.get(`${this.api}api/readUserById`+id);
  }
  updateUser(id:any, user: PersonForm): Observable<any> {
    return this.http.put(this.api+"api/updateUser", {id,  user});
  }
  deleteUser(id:any): Observable<any>  { 
    return this.http.delete(this.api+"api/deleteUser"+ id);
  }
}
