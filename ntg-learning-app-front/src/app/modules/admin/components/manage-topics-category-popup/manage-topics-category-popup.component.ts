import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../../services/notification/notification.service';

@Component({
  selector: 'app-manage-topics-category-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-topics-category-popup.component.html',
  styleUrl: './manage-topics-category-popup.component.css'
})
export class ManageTopicsCategoryPopupComponent implements OnChanges{
    
    @Input() isOpen = false;
    @Output() close = new EventEmitter<void>();
    @Output() save = new EventEmitter<any>();
    @Input() errorMessage = '';
    @Input() isEditMode = false;
    @Input() category: any | null = null;
    @Input() topic: any | null = null;

    editCategoryForm!: FormGroup;
    editTopicForm!: FormGroup;

    constructor(private fb: FormBuilder, 
                private adminService: AdminService,
                private notificationService: NotificationService ){

        this.editCategoryForm = this.fb.group({
          categoryId: [''],
          categoryName: ['']
        });

        this.editTopicForm = this.fb.group({
          topicId: [''],
          name: [''],
          categoryName: ['']
        });
    }


   ngOnChanges(changes: SimpleChanges): void {
    if (changes['category'] && this.category && !this.isEditMode) {
      this.editCategoryForm.patchValue({
        categoryId: this.category.categoryId,
        categoryName: this.category.categoryName
      });
    }

    if (changes['topic'] && this.topic && this.isEditMode) {
      this.editTopicForm.patchValue({
        topicId: this.topic.topicId,
        name: this.topic.name,
        categoryName: this.category.categoryName
      });
    }

    if (!this.isEditMode && !this.category) {
      this.editCategoryForm.reset();
    }

    if (this.isEditMode && !this.topic) {
      this.editTopicForm.reset();
    }
  }


  onCancel() {
    this.editCategoryForm.reset();
    this.editTopicForm.reset();
    this.close.emit();
  }

  updateCategory(){
    
    const payload = {
      id: this.editCategoryForm.value.categoryId,
      name: this.editCategoryForm.value.categoryName
    }

    this.adminService.updateCategory(payload, payload.id).subscribe({
      next: (res)=> {
        this.notificationService.success(res.message);
        this.editCategoryForm.reset();
        this.close.emit();
        
      },
      error: (error: HttpErrorResponse)=> {
          this.errorMessage = error?.error?.message ||
                              error?.error.errorMessage || 
                              'failed to update category';
      }
    });

  }



  updateTopic(){
    
    const payload = {
      topicId: this.editTopicForm.value.topicId,
      topicName: this.editTopicForm.value.name,
      categoryName: this.editTopicForm.value.categoryName
    }

    this.adminService.updateTopic(payload, payload.topicId).subscribe({
      next: (res)=> {
        this.notificationService.success(res.message);
        this.editTopicForm.reset();
        this.close.emit();
        
      },
      error: (error: HttpErrorResponse)=> {
          this.errorMessage = error.error?.message ||
                           error.error?.error ||
                          'failed to update topic';
      }
    });

  }




}
