import { Component, OnInit } from '@angular/core';
import { PeticionesService } from 'src/app/services/peticiones.service';

interface Busqueda{
  name:any;
  year:any;
  console:any;
  desarrollador:any;
}

class Filter{
  name?:any;
  year?:any;
  console?:any;
  desarrollador?:any;
}

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})

export class BuscarComponent implements OnInit {

  public consolas: any[] = new Array<any>();
  public desarrolladores: any[] = new Array<any>();

  public busqueda!:Busqueda;
  public filtrado!:any;

  constructor(private _peticiones:PeticionesService) { 
    this.busqueda = {name:null,year:null,console:null,desarrollador:null};
  }


  ngOnInit(): void {
  // Mandamos a traer el catalogo de consolas
    this._peticiones.getConsoles().subscribe(res => {
      this.consolas = res.consoles;
    });

    // Mandamos a traer el catalogo de los desarrolladores
    this._peticiones.getDevelopers().subscribe(res => {
      this.desarrolladores = res.developers;
    });
  }

  submitVideojuego(){

    var params = {
      filters: new Filter(),
      pagination:{}
    }

    if(this.busqueda.name != '' && this.busqueda.name != null ){
      params.filters.name = this.busqueda.name;
    }

    if(this.busqueda.year != '' && this.busqueda.year != null ){
      params.filters.year = this.busqueda.year;
    }

    if(this.busqueda.console != '' && this.busqueda.console != null ){
      params.filters.console = this.busqueda.console.name;
    }

    if(this.busqueda.desarrollador != '' && this.busqueda.desarrollador != null ){
      params.filters.desarrollador = this.busqueda.desarrollador.name;
    }

    this.filtrado = params; 
  }
}
