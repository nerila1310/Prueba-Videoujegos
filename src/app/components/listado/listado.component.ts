import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  public videojuegos: any[] = new Array<any>();

  constructor() { }

  ngOnInit(): void {
    this.getProjects();
  }

  //getDevelopers();
  getProjects = async () =>{

    var url = 'https://api-videogames.herokuapp.com/api/videogames/search';
    var auth ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmVyaWxhIiwiaWF0IjoxNjI4ODc4MTgxfQ.ZRz8E21Ek4-Ny0hXBx7Sq401ZZ8yuSAeL0D7wqAUJyA';
    var data = {	"filters": {}, "pagination": {}};           

    const respuesta = await fetch(url, {
                          method: 'POST',
                          body: JSON.stringify(data),
                          headers:{'Authorization':auth, 'Content-Type': 'application/json' }
                      }
                    );
    const resultado = await respuesta.json();
    this.videojuegos = resultado.videogames;
  }

}
