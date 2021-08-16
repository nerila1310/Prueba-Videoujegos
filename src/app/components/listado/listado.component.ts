import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { PeticionesService } from 'src/app/services/peticiones.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  public videojuegos: any[] = new Array<any>();
  @Input() filter!:any;

  constructor(private _peticiones:PeticionesService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.listarVideogames(null);
  }

  listarVideogames(filter:any){
    // Mandamos a traer todos los videojuegos
    this._peticiones.getVideogames(filter).subscribe(res => {
      this.videojuegos = res.videogames;
    });    
  }

  ngOnChanges(changes: SimpleChanges){
    this.listarVideogames(this.filter);
  }
}
