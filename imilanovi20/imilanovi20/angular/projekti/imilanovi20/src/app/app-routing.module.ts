import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DokumentacijaComponent } from './dokumentacija/dokumentacija.component';
import { FilmComponent } from './film/film.component';
import { FilmoviPregledComponent } from './filmovi-pregled/filmovi-pregled.component';
import { OdjavaComponent } from './odjava/odjava.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { ProfilComponent } from './profil/profil.component';
import { ZanroviComponent } from './zanrovi/zanrovi.component';


const routes: Routes = [
  { path: '', redirectTo: '/pocetna', pathMatch: 'full' }, 

  { path: 'pocetna', component: PocetnaComponent },
  { path: 'zanrovi', component: ZanroviComponent },
  { path: 'dokumentacija', component: DokumentacijaComponent },
  { path: 'filmoviPopis', component: FilmoviPregledComponent },
  { path: 'filmoviPopis/:id', component: FilmComponent },
  { path: 'prijava', component: PrijavaComponent },
  { path: 'odjava', component: OdjavaComponent },
  { path: 'profil', component: ProfilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
