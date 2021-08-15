import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Common {
  _id:String;
  name:String;
};

interface ModelVideojuego {
  developer:Common;
  name:String;
  description:String,
  image:String,
  year:String,
  console: Array<Common>
};

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})

export class AgregarComponent implements OnInit {

  public modelVideojuego!:ModelVideojuego; 

  public consolas: any[] = new Array<any>();
  public desarrolladores: any[] = new Array<any>();
  public games!:FormGroup;
  public submit:boolean = false;
  public idGame!:any;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
    this.addForm();
    this.getCatalogos();
    this.getDevelopers();

    this._route.params.subscribe(params=>{
      this.idGame = params.id;
      this.getVideoGame(this.idGame);
    })
  }

  public addForm():void{
    this.games = this.formBuilder.group({
      developer:['', [Validators.required]],
      name:['', [Validators.required]],
      description:['', [Validators.required, Validators.maxLength(300)]],
      year:['', Validators.required],
      console:['', Validators.required]
    });
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
    
    this.games.patchValue({
      developer:resultado.videogame.developer,
      name:resultado.videogame.name,
      description: resultado.videogame.description,
      year:resultado.videogame.year,
      console:resultado.videogame.console[0]
    });
  }

  compare(v1:any, v2:any){
    return v1._id === v2._id;
  }

  getCatalogos = async () =>{

    var url = 'https://api-videogames.herokuapp.com/api/consoles/catalog';
    var auth ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmVyaWxhIiwiaWF0IjoxNjI4ODc4MTgxfQ.ZRz8E21Ek4-Ny0hXBx7Sq401ZZ8yuSAeL0D7wqAUJyA';
  
    const respuesta = await fetch(url, {
                          method: 'GET',
                          headers:{'Authorization':auth, 'Content-Type': 'application/json' }
                      }
                    );
    const resultado = await respuesta.json();
    this.consolas = resultado.consoles;
  }

  getDevelopers = async () =>{

    var url = 'https://api-videogames.herokuapp.com/api/developer/catalog';
    var auth ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmVyaWxhIiwiaWF0IjoxNjI4ODc4MTgxfQ.ZRz8E21Ek4-Ny0hXBx7Sq401ZZ8yuSAeL0D7wqAUJyA';
  
    const respuesta = await fetch(url, {
                          method: 'GET',
                          headers:{'Authorization':auth, 'Content-Type': 'application/json' }
                      }
                    );
    const resultado = await respuesta.json();
    this.desarrolladores = resultado.developers;
  }

  //getDevelopers();
  guardarProjects = async (data:any) =>{

    var url = 'https://api-videogames.herokuapp.com/api/videogames';
    var metodo = 'POST'

    if(this.idGame && this.idGame != null){
      url = 'https://api-videogames.herokuapp.com/api/videogames/'+this.idGame;
      data._id = this.idGame;
      metodo = 'PUT'
    }

    var auth ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmVyaWxhIiwiaWF0IjoxNjI4ODc4MTgxfQ.ZRz8E21Ek4-Ny0hXBx7Sq401ZZ8yuSAeL0D7wqAUJyA';

     const respuesta = await fetch(url, {
                           method: metodo,
                           body: JSON.stringify(data),
                           headers:{'Authorization':auth, 'Content-Type': 'application/json' }
                       }
                     );
    let resultado = await respuesta.json();
    this.submit = false;
    //resultado = JSON.parse(resultado);
    console.log(resultado);
    
    if(resultado.success){
      this.route.navigateByUrl('/listar');
    }
  }


  onSubmit(){
    this.submit = true;
    let forma = JSON.parse(JSON.stringify(this.games.value));
    forma.console = [forma.console];
    this.guardarProjects(forma);
    
  }

}
