import { Injectable } from '@angular/core';

export interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private adminNavigation: NavItem[] = [
    {
      label: 'Dashboard',
      route: '/authenticated/admin/dashboard',
      icon: '📊'
    },
    {
      label: 'Manage Users',
      route: '/authenticated/admin/dashboard',
      icon: '👥'
    },
    {
      label: 'Topics & Categories',
      route: '/authenticated/admin/view-topics',
      icon: '📚'
    }
  ];

  private developerNavigation: NavItem[] = [
    {
      label: 'My Topics',
      route: '/authenticated/developer/dashboard',
      icon: '📚'
    },
    {
      label: 'Progress',
      route: '/authenticated/developer/progress',
      icon: '📈'
    }
  ];

  constructor() { }

  getNavigationItems(role: string): NavItem[] {
    switch (role) {
      case 'ADMIN':
        return this.adminNavigation;
      case 'DEVELOPER':
        return this.developerNavigation;
      default:
        return [];
    }
  }
}
