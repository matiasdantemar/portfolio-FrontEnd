import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  // url="http://npinti.ddnsnet:9008/api/auth/login";
  url="http://localhost:8080/api/auth/login";
  currentUserSubject: BehaviorSubject<any>;
  constructor(private http:HttpClient) {
    console.log("El servicio de autenticacion esta corriendo");
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
   }

   //esta funcion devuelve el token
   IniciarSesion(credenciales:any): Observable<any> {
    //aqui se hace la llamada a la API
    return this.http.post(this.url, credenciales).pipe(map(data=>{
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
      return data;
    }))
   }

   get UsuarioAutenticado(){
    return this.currentUserSubject.value;
  }
}

