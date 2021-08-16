import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionesService } from 'src/app/services/peticiones.service';



@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})

export class AgregarComponent implements OnInit {

  public consolas: any[] = new Array<any>();
  public desarrolladores: any[] = new Array<any>();
  public games!:FormGroup;
  public submit:boolean = false;
  public idGame!:any;
  public title:string = 'Crear Videjuego'

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private _route: ActivatedRoute,
    private _peticiones:PeticionesService
  ) { }

  ngOnInit(): void {
    
    this.addForm();

    // Mandamos a traer el catalogo de consolas
    this._peticiones.getConsoles().subscribe(res => {
      this.consolas = res.consoles;
    });

    // Mandamos a traer el catalogo de los desarrolladores
    this._peticiones.getDevelopers().subscribe(res => {
      this.desarrolladores = res.developers;
    });

    // Obtenemos el id del path
    this._route.params.subscribe(params=>{
      this.idGame = params.id;
      if(this.idGame) {
        this.setValues(this.idGame)
        this.title = "Editar Videojuego";
      };
    })
  }

  // creamos las validaciones para el formulario
  public addForm():void{
    this.games = this.formBuilder.group({
      developer:['', [Validators.required]],
      name:['', [Validators.required]],
      description:['', [Validators.required, Validators.maxLength(300)]],
      year:['', Validators.required],
      console:['', Validators.required]
    });
  }

  // Mostramos los valores en el formulario en caso de que se desee editar
  setValues = async (id:string) =>{

    // Mandamos a traer el videojuego para mostrar su detalle
    this._peticiones.getVideogame(this.idGame).subscribe(res => {
      this.games.patchValue({
        developer:res.videogame.developer,
        name:res.videogame.name,
        description: res.videogame.description,
        year:res.videogame.year,
        console:res.videogame.console[0]
      });
    });
  }

  compare(v1:any, v2:any){
    return v1._id === v2._id;
  }

  guardarProjects = async (data:any) =>{
    var url = 'https://api-videogames.herokuapp.com/api/videogames';
    var methodPost = true;

    if(this.idGame && this.idGame != null){
      url = 'https://api-videogames.herokuapp.com/api/videogames/'+this.idGame;
      data._id = this.idGame;
      methodPost = false;
    }

    // Creamos o editamos un nuevo videojuego
    this._peticiones.saveVideogame(url, methodPost, data).subscribe(res => {
      this.submit = false;
      if(res.success){ this.route.navigateByUrl('/listar'); } 
    });
  }

  submitVideojuego(){
    this.submit = true;
    let forma = JSON.parse(JSON.stringify(this.games.value));
    forma.console = [forma.console];
    this.guardarProjects(forma);
  }
}