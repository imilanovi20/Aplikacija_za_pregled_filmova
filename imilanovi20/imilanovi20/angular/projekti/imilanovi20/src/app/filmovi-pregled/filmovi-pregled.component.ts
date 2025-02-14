import { Component, OnInit } from '@angular/core';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-filmovi-pregled',
  templateUrl: './filmovi-pregled.component.html',
  styleUrls: ['./filmovi-pregled.component.scss'],
})
export class FilmoviPregledComponent implements OnInit {
  constructor(private filmoviServis: FilmService) {}
  listaMojiFilmovi: any;

  ngOnInit() {
    this.ucitajMoje();
  }

  async ucitajMoje() {
    this.listaMojiFilmovi = JSON.parse(await this.filmoviServis.dohvatiMoje());
  }
}
