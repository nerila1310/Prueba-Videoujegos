import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  private urlApi = 'https://api-videogames.herokuapp.com';
  private auth ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmVyaWxhIiwiaWF0IjoxNjI4ODc4MTgxfQ.ZRz8E21Ek4-Ny0hXBx7Sq401ZZ8yuSAeL0D7wqAUJyA';
  private headers = {'Authorization':this.auth, 'Content-Type': 'application/json' }
  
  constructor(private http: HttpClient) { }

  //Funcion para regresar los videojueo¿gos al componente listado
  getVideogames():Observable<any>{

    const url = `${this.urlApi}/api/videogames/search`;
    var data = {"filters": {}, "pagination": {}};
    
    return this.http.post(url, JSON.stringify(data), {headers:this.headers } );
  }
}
