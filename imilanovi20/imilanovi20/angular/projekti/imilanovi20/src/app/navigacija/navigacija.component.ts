import { Component } from '@angular/core';

@Component({
  selector: 'app-navigacija',
  templateUrl: './navigacija.component.html',
  styleUrls: ['./navigacija.component.scss'],
})
export class NavigacijaComponent {
  
  get korisnik() {
    return sessionStorage.getItem('uloga') == '2';
  }

  get admin() {
    return sessionStorage.getItem('uloga') == '1';
  }

  get gost() {
    return (
      sessionStorage.getItem('uloga') == '' ||
      sessionStorage.getItem('uloga') == null
    );
  }
}
