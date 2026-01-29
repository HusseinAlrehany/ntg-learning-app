import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { NavigationService } from '../../services/navigation/navigation.service';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  
  @Output() closeSidebar = new EventEmitter<void>();

  navigationItems: NavItem[] = [];
  userRole: string = '';

  constructor(
    private storageService: StorageService,
    private navigationService: NavigationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadNavigation();
    
    // Reload on navigation in case user switched roles
    this.router.events.subscribe(() => {
      this.loadNavigation();
    });
  }

  private loadNavigation(): void {
    const user = this.storageService.getUser();
    this.userRole = user?.userRole || '';
    this.navigationItems = this.navigationService.getNavigationItems(this.userRole);
  }

  onNavClick(): void {
    // Close sidebar on mobile after clicking a link
    if (window.innerWidth < 768) {
      this.closeSidebar.emit();
    }
  }
}
