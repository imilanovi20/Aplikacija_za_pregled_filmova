import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  constructor() {}
  async dohvatiMoje() {
    let url = 'http://localhost:7000/api/filmovi';
    let response = await fetch(url);
    return await response.text();
  }

  async dajFilm(id: number) {
    let url = 'http://localhost:7000/api/filmovi/' + id;
    let response = await fetch(url);
    return await response.text();
  }
}
