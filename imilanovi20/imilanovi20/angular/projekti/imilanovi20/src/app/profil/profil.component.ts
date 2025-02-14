import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  constructor(private servisKorisnik: KorisnikService) {}
  
  idProfil: any = '';
  korimeProfil: any = '';
  imeProfil: any = '';
  prezimeProfil: any = '';
  korisnik: any = '';

  ngOnInit() {
    let logirani = this.dajPrijavljenog();
    if (logirani != null) {
      this.dajKorisnika(logirani);
    }
  }

  async dajKorisnika(ime: any) {
    this.korisnik = JSON.parse(await this.servisKorisnik.dohvatiKorisnika(ime));
    this.prezimeProfil = this.korisnik.prezime;
    this.imeProfil = this.korisnik.ime;
    this.korimeProfil = this.korisnik.korime;
    this.idProfil = this.korisnik.id;
  }

  dajPrijavljenog() {
    
    return sessionStorage.getItem('korime');
  }
}
