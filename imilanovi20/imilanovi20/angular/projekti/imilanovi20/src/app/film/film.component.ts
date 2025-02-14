import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
})
export class FilmComponent implements OnInit {
  constructor(
    private aktiviranRoute: ActivatedRoute,
    private filmServis: FilmService
  ) {}

  idOdabranog: any;
  prikazaniFilm: any;

  
  ngOnInit() {
    this.prikazaniFilm = '';
    console.log(this.prikazaniFilm);

    
    this.idOdabranog = this.aktiviranRoute.snapshot.paramMap.get('id');
    this.prikaz();
  }

  async prikaz() {
    this.prikazaniFilm = JSON.parse(
      await this.filmServis.dajFilm(this.idOdabranog)
    );
    console.log('film ' + this.prikazaniFilm);
  }
}
