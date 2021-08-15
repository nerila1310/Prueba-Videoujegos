import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  public videojuego:any = {};
  public console:any[] = [];
  public idGame:any;
  
  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this.idGame = params.id;
      this.getVideoGame(this.idGame);
    })
  }

  getVideoGame = async (id:string) =>{

    var url = `https://api-videogames.herokuapp.com/api/videogames/${id}`;
    var auth ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmVyaWxhIiwiaWF0IjoxNjI4ODc4MTgxfQ.ZRz8E21Ek4-Ny0hXBx7Sq401ZZ8yuSAeL0D7wqAUJyA';
  
    const respuesta = await fetch(url, {
                          method: 'GET',
                          headers:{'Authorization':auth, 'Content-Type': 'application/json' }
                      }
                    );
    const resultado = await respuesta.json();
    this.videojuego=resultado.videogame;
  }

}
