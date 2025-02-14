import { Component, OnInit } from '@angular/core';
import { ZanrService } from '../zanr.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.scss'],
})
export class PocetnaComponent implements OnInit {
  constructor(private zanrServis: ZanrService) {}
  listaMojiZanrovi: any;

  ngOnInit() {
    this.ucitajMoje();
  }

  async ucitajMoje() {
    this.listaMojiZanrovi = JSON.parse(await this.zanrServis.dohvatiMoje());
  }
}
