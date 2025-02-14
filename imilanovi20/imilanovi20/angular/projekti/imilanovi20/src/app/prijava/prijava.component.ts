import { Component } from '@angular/core';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss'],
})
export class PrijavaComponent {
  constructor(private servisKorisnik: KorisnikService) {}
  korisnickoIme: any;
  lozinka: any;

  unosKorime(event: any) {
    console.log(event.target.value);
    this.korisnickoIme = event.target.value;
  }
  unosLoz(event: any) {
    console.log(event.target.value);
    this.lozinka = event.target.value;
  }

  prijava() {
    this.informacijaUspjesnosti();
  }

  async informacijaUspjesnosti() {
    let info = await this.servisKorisnik.prijava(
      this.korisnickoIme,
      this.lozinka
    );
    console.log('info ' + info);
    if (info != false) {
      
      sessionStorage.setItem('uloga', info.uloga_id);
      sessionStorage.setItem('korime', info.korime);
    }
    return info;
  }
}
