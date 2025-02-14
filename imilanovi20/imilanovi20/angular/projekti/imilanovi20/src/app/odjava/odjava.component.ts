import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-odjava',
  templateUrl: './odjava.component.html',
  styleUrls: ['./odjava.component.scss'],
})
export class OdjavaComponent {
  constructor(private router: Router) {}

  
  odjava() {
    console.log('odjavi me');
    sessionStorage.setItem('uloga', '');
    sessionStorage.setItem('korime', '');
    this.router.navigate(['/pocetna']);
  }
}
