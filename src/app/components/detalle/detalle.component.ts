import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionesService } from 'src/app/services/peticiones.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  public videojuego:any = {};
  public console:any[] = [];
  public idGame:any;
  
  constructor(private _route: ActivatedRoute, private _peticiones:PeticionesService) { }

  ngOnInit(): void {
    // Obtenemos el id del path
    this._route.params.subscribe(params=>{
      this.idGame = params.id;
    });

    // Mandamos a traer el videojuego para mostrar su detalle
    this._peticiones.getVideogame(this.idGame).subscribe(res => {
      this.videojuego=res.videogame;
    });
  }
}
