import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ZanrService {
  constructor() {}

  async dohvatiSTMDBa() {
    let response = await fetch('http://localhost:7000/api/tmdb/zanr');
    return await response.text();
  }

  async dohvatiMoje() {
    let response = await fetch('http://localhost:7000/api/zanr');
    return await response.text();
  }

  async promijeniIme(id: any, ime: any) {
    let zaglavlje = new Headers();
    zaglavlje.set('Content-Type', 'application/json');

    let podatak = await fetch(`http://localhost:7000/api/zanr/:id`, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        name: ime,
      }),
      headers: zaglavlje,
    });
    await podatak.text();
  }

  async dodaj(id: any, name: any) {
    let zaglavlje = new Headers();
    zaglavlje.set('Content-Type', 'application/json');

    let podatak = await fetch(`http://localhost:7000/api/zanr`, {
      method: 'POST',
      body: JSON.stringify({
        id: id,
        name: name,
      }),
      headers: zaglavlje,
    });
    await podatak.text();
  }

  async brisanje() {
    let url = 'http://localhost:7000/api/zanr';
    let response = await fetch(url);
    return await response.text();
  }

  async brisanje2(info: any) {
    let novi_info = JSON.parse(info);

    let zaglavlje = new Headers();
    zaglavlje.set('Content-Type', 'application/json');

    let data = await fetch(`http://localhost:7000/api/zanr`, {
      method: 'DELETE',
      body: JSON.stringify({
        zanrovi: novi_info,
      }),
      headers: zaglavlje,
    });
    await data.text();
  }
}
