import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective implements OnInit {

  private requiredRole: string = '';
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private storageService: StorageService
  ) { }

  @Input()
  set appHasRole(role: string) {
    this.requiredRole = role;
    this.updateView();
  }

  ngOnInit(): void {
    this.updateView();
  }

  private updateView(): void {
    const userRole = this.storageService.getUserRole();
    const hasRole = userRole === this.requiredRole;

    if (hasRole && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasRole && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
