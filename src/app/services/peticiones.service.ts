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

  //Funcion para regresar los videojuegos al componente listado
  getVideogames(filter:any):Observable<any>{
    const url = `${this.urlApi}/api/videogames/search`;
    var data = filter && filter != null ? filter : {"filters": {}, "pagination": {}};
    return this.http.post(url, JSON.stringify(data), {headers:this.headers } );
  }

  //Funcion para regresar la información de un videojuego para el componente detalle
  getVideogame(id:string):Observable<any>{
    const url = `${this.urlApi}/api/videogames/${id}`; 
    return this.http.get(url, {headers:this.headers } );
  }

  //Funcion para regresar el catalogo de consolas
  getConsoles():Observable<any>{
    const url = `${this.urlApi}/api/consoles/catalog`;  
    return this.http.get(url, {headers:this.headers } );
  }

  //Funcion para regresar el catalogo de los desarrolladores
  getDevelopers():Observable<any>{
    const url = `${this.urlApi}/api/developer/catalog`;
    return this.http.get(url, {headers:this.headers } );
  }

  //Funcion para crear un nuevo videojuego
  saveVideogame(url:string, post:boolean, videojuego:any):Observable<any>{
    if(post){
      return this.http.post(url, JSON.stringify(videojuego), {headers:this.headers } );
    }else{
      return this.http.put(url, JSON.stringify(videojuego), {headers:this.headers } );
    }
  }
}
