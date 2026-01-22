import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { AuthModelComponent } from "../auth-model/auth-model.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NavbarComponent, AuthModelComponent, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

    //successMessage = '';
    authMode: 'signin' | 'signup' = 'signin';
    showAuth = false;

  openAuth(mode: 'signin' | 'signup') {
    this.authMode = mode;
    this.showAuth = true;
  }

}
