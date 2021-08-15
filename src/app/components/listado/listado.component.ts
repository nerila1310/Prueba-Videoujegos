import { Component, OnInit } from '@angular/core';
import { PeticionesService } from 'src/app/services/peticiones.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  public videojuegos: any[] = new Array<any>();

  constructor(private _peticiones:PeticionesService) { }

  ngOnInit(): void {
    
    // Mandamos a traer todos los videojuegos
    this._peticiones.getVideogames().subscribe(res => {
      this.videojuegos = res.videogames;
    });
  }
}
