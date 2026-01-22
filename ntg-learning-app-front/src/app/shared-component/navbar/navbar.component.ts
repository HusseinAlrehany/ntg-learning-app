import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Output() openAuthModal = new EventEmitter<'signin' | 'signup'>();

  open(mode: 'signin' | 'signup') {
    this.openAuthModal.emit(mode);
  }


}
