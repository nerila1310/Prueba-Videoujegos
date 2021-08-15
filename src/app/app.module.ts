import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListadoComponent } from './components/listado/listado.component';
import { MenuComponent } from './components/menu/menu.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { PeticionesService } from './services/peticiones.service';

@NgModule({
  declarations: [
    AppComponent,
    AgregarComponent,
    BuscarComponent,
    DetalleComponent,
    ListadoComponent,
    MenuComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  providers: [PeticionesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
