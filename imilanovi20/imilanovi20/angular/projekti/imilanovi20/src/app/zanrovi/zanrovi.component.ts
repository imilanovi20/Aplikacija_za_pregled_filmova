import { Component } from '@angular/core';
import { ZanrService } from '../zanr.service';

@Component({
  selector: 'app-zanrovi',
  templateUrl: './zanrovi.component.html',
  styleUrls: ['./zanrovi.component.scss'],
})
export class ZanroviComponent {
  constructor(private zanrServis: ZanrService) {}

  listaTMDBzanrovi: any;
  listaMojiZanrovi: any;
  idOdabranogNovogZanra: any;
  idOdabranogZaPromjenuImena: any;
  imeNovo: any;
  nazivNovogZanra: any;

  async ucitajTMDB() {
    this.listaTMDBzanrovi = JSON.parse(
      await this.zanrServis.dohvatiSTMDBa()
    ).genres;
    console.log(this.listaTMDBzanrovi);
  }

  async ucitajMoje() {
    this.listaMojiZanrovi = JSON.parse(await this.zanrServis.dohvatiMoje());
    console.log(this.listaMojiZanrovi);
  }

  async promijeniIme() {
    await this.zanrServis.promijeniIme(
      this.idOdabranogZaPromjenuImena,
      this.imeNovo
    );

    this.listaMojiZanrovi = JSON.parse(await this.zanrServis.dohvatiMoje());
  }

  async dodajZanr() {
    await this.zanrServis.dodaj(
      this.idOdabranogNovogZanra,
      this.nazivNovogZanra
    );
  }

  odabraniTMDB(idZanra: any, nazivZanra: any) {
    this.idOdabranogNovogZanra = idZanra;
    this.nazivNovogZanra = nazivZanra;
  }

  odabraniMoji(idZanra: any) {
    this.idOdabranogZaPromjenuImena = idZanra;
  }
  async izbrisi() {
    let info = await this.zanrServis.brisanje();
    await this.zanrServis.brisanje2(info);
    this.listaMojiZanrovi = JSON.parse(await this.zanrServis.dohvatiMoje());
  }
}
