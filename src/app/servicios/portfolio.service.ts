import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  // url:string="http//npinti.ddns.net:9008/api/"
  url:string="http//localhost:8080/ver/personas"
  constructor(private http:HttpClient) { }

  obtenerDatos():Observable<any> {
   return this.http.get(this.url+"persona");
  }
}
