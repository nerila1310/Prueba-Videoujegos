import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  public videojuego:any = {};
  public console:any[] = [];

  constructor(private _router: Router,private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id = params.id;
      this.getVideoGame(id);
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
    console.log(this.videojuego.developer.name);
    
  }

}
