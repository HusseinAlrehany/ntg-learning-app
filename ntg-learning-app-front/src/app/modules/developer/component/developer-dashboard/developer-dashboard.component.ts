import { Component, OnInit, signal } from '@angular/core';
import { DeveloperService } from '../../service/developer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../../services/authservice/auth.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { Router } from '@angular/router';
import { ManageTopicPopupComponent } from '../manage-topic-popup/manage-topic-popup.component';
import { CommonModule } from '@angular/common';
import { CategoryInfo } from '../../../../models/category-info';
import { Topic } from '../../../../models/topic';


@Component({
  selector: 'app-developer-dashboard',
  standalone: true,
  imports: [CommonModule, ManageTopicPopupComponent],
  templateUrl: './developer-dashboard.component.html',
  styleUrl: './developer-dashboard.component.css'
})
export class DeveloperDashboardComponent implements OnInit {

  errorMessage = '';
  isPopupOpen = signal(false);
  categories: CategoryInfo[] = [];
  totalDevelopers = 0;
  pendingUpdates = new Map<number, string>();
  validationMessage = '';

  constructor(
    private devService: DeveloperService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private storageService: StorageService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getAllCatWithProgress();
  }

  openAddTopicPopup(){
    this.isPopupOpen.set(true);
  }

  closePopup(){
    this.isPopupOpen.set(false);
    this.errorMessage = '';
  }

  getAllCatWithProgress() {
    this.devService.getAllCategoriesWithProgress().subscribe({
      next: (res: CategoryInfo[]) => {
        console.log(res);
        this.categories = res.map(cat => ({
          ...cat,
          isExpanded: false
        }));
        this.totalDevelopers = res.length;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error?.errorMessage || 'Failed to load categories';
      }
    });
  }

  toggleCategory(categoryId: number) {
    const category = this.categories.find(cat => cat.categoryId === categoryId);
    if (category) {
      category.isExpanded = !category.isExpanded;
    }
  }

  onStatusChange(topicId: number, newStatus: string, currentStatus: string) {
    if (newStatus === currentStatus) {
      this.validationMessage = '';
      this.pendingUpdates.delete(topicId);
      return;
    }
    
    this.validationMessage = '';
    this.pendingUpdates.set(topicId, newStatus);
  }

  hasUpdate(topicId: number): boolean {
    return this.pendingUpdates.has(topicId);
  }

  updateTopicStatus(topic: Topic) {
    const newStatus = this.pendingUpdates.get(topic.topicId);
    
    if (!newStatus) {
      this.validationMessage = 'Please select a different status to update';
      return;
    }

    
    this.devService.updateTopicStatus(topic.topicId, newStatus).subscribe({
      next: (res) => {
        this.notificationService.success(res.message);
        this.pendingUpdates.delete(topic.topicId);
        this.getAllCatWithProgress(); 
      },
      error: (error: HttpErrorResponse) => {
        this.validationMessage = error.error?.errorMessage || 'Failed to update topic status';
      }
    });
  }
}