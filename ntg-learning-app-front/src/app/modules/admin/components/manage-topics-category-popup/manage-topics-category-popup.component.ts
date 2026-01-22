import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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


    constructor(private fb: FormBuilder){
        this.editCategoryForm = this.fb.group({
          categoryName: ['']
        });

        this.editTopicForm = this.fb.group({
          name: [''],
          description: ['']
        });
    }


   ngOnChanges(changes: SimpleChanges): void {
    if (changes['category'] && this.category && !this.isEditMode) {
      this.editCategoryForm.patchValue({
        categoryName: this.category.categoryName
      });
    }

    if (changes['topic'] && this.topic && this.isEditMode) {
      this.editTopicForm.patchValue({
        name: this.topic.name,
        description: this.topic.description
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




}
