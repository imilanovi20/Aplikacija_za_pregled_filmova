import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class KorisnikService {
  constructor(private router: Router) {}

  async prijava(korisnickoIme: any, lozinka: any) {
    let zaglavlje = new Headers();
    zaglavlje.set('Content-Type', 'application/json');

    let response = await fetch(
      'http://localhost:7000/api/korisnici/' + korisnickoIme + '/prijava',
      {
        method: 'POST',
        body: JSON.stringify({
          korime: korisnickoIme,
          lozinka: lozinka,
        }),
        headers: zaglavlje,
      }
    );

    if (response.status == 200) {
      
      this.router.navigate(['/pocetna']);

      let podaci = await response.text();
      
      return JSON.parse(podaci);
    } else {
      return false;
    }
  }

  async dohvatiKorisnika(korime: any) {
    let url = 'http://localhost:7000/api/korisnici/' + korime;
    let response = await fetch(url);
    return await response.text();
  }
}
