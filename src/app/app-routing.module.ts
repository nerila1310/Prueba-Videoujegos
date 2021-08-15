import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './components/agregar/agregar.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { ListadoComponent } from './components/listado/listado.component';

const routes: Routes = [
  {path:'', component:ListadoComponent},
  {path:'buscar', component:BuscarComponent},
  {path:'agregar', component:AgregarComponent},
  { path: 'detalle/:id', component: DetalleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
