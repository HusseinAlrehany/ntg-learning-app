import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { AuthService } from '../../services/authservice/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  @Output() openAuthModal = new EventEmitter<'signin' | 'signup'>();
  @Output() toggleSidebar = new EventEmitter<void>();

  isLoggedIn = false;
  userRole: string = '';

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.updateAuthStatus();
    this.router.events.subscribe(() => {
      this.updateAuthStatus();
    });
  }

  private updateAuthStatus(): void {
    const user = this.storageService.getUser();
    this.isLoggedIn = !!user?.userId;
    this.userRole = user?.userRole || '';
  }

  open(mode: 'signin' | 'signup') {
    this.openAuthModal.emit(mode);
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.storageService.clearUserData();
        this.notificationService.success('Logged out successfully');
        this.router.navigate(['/']);
        this.updateAuthStatus();
      },
      error: () => {
        // Even if logout API fails, clear local session
        this.storageService.clearUserData();
        this.router.navigate(['/']);
        this.updateAuthStatus();
      }
    });
  }
}

