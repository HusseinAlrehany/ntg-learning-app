import { Component, Input, OnInit, signal } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../services/notification/notification.service';
import { ManageTopicsCategoryPopupComponent } from '../manage-topics-category-popup/manage-topics-category-popup.component';

@Component({
  selector: 'app-view-and-manage-topics',
  standalone: true,
  imports: [CommonModule, ManageTopicsCategoryPopupComponent],
  templateUrl: './view-and-manage-topics.component.html',
  styleUrl: './view-and-manage-topics.component.css'
})
export class ViewAndManageTopicsComponent implements OnInit{

  isPopupOpen = signal(false);
  selectedCategory = signal<any | null>(null);
  selectedTopic = signal<any | null>(null);
  isEditMode = signal(false);

  categories: any [] = [];
  errorMessage = '';
 
  constructor(private adminService: AdminService,
              private notificationService: NotificationService
  ){}


  ngOnInit(): void {
    this.getAllTopics();
  }

 toggleCategory(category: any){
   category.expanded = !category.expanded;
 }

 openEditCategoryPopup(selectedCategory: any){
  this.selectedCategory.set(selectedCategory);
  this.selectedTopic.set(null);
  this.isEditMode.set(false);
  this.isPopupOpen.set(true);

 }

 openEditTopicPopup(selectedCategory: any,selectedTopic: any){
  this.selectedTopic.set(selectedTopic);
  this.selectedCategory.set(selectedCategory);
  this.isEditMode.set(true);
   this.isPopupOpen.set(true);
 }

 closePopup(){
  this.selectedCategory.set(null);
  this.selectedTopic.set(null);
  this.isPopupOpen.set(false);
  this.errorMessage = '';
}

 deleteTopicById(topicId:number){
  this.adminService.deleteTopicById(topicId).subscribe({
    next: (res)=> {
      this.notificationService.success(res.message);
      this.getAllTopics();
    },
    error: (error: HttpErrorResponse)=> {
      this.errorMessage = error.error?.message ||
                           error.error?.error ||
                          'failed to delete topic';
                          
    }
  });
    
 }

 deleteCategoryById(categoryId:number){
    this.adminService.deleteCategoryById(categoryId).subscribe({
      next: (res)=> {
        this.notificationService.success(res.message);
        this.getAllTopics();
      },
      error: (error: HttpErrorResponse)=> {
        this.errorMessage = error.error?.message ||
                           error.error?.error ||
                          'failed to delete category';

      }
    });
 }

  getAllTopics() {
    this.adminService.getAllTopics().subscribe({
      next: (res)=> {
        console.log(res);
        this.categories = res

      },
      error: (error: HttpErrorResponse)=> {
          this.errorMessage = error.error?.message ||
                           error.error?.error ||
                          'failed to load topics';
      }
    });
  }

}
