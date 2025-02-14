import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { NavigacijaComponent } from './navigacija/navigacija.component';
import { ZanroviComponent } from './zanrovi/zanrovi.component';
import { FormsModule } from '@angular/forms';
import { DokumentacijaComponent } from './dokumentacija/dokumentacija.component';
import { FilmoviPregledComponent } from './filmovi-pregled/filmovi-pregled.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { FilmComponent } from './film/film.component';
import { OdjavaComponent } from './odjava/odjava.component';
import { ProfilComponent } from './profil/profil.component';
@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    NavigacijaComponent,
    ZanroviComponent,
    DokumentacijaComponent,
    FilmoviPregledComponent,
    PrijavaComponent,
    FilmComponent,
    OdjavaComponent,
    ProfilComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
