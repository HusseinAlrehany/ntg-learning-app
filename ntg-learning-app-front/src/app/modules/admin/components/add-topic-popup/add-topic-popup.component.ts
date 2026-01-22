import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-topic-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-topic-popup.component.html',
  styleUrl: './add-topic-popup.component.css'
})
export class AddTopicPopupComponent implements OnInit{

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  @Input() errorMessage = '';

  addTopicForm!: FormGroup;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.addTopicForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.adminService.getCategoriesForDropdown().subscribe({
      next: (res) => this.categories = res,
      error: (error: HttpErrorResponse) => 
         this.errorMessage = 
             error.error?.message || 
             error.error?.error ||
             'failed to load categories'
    });
  }

  onCancel() {
    this.addTopicForm.reset();
    this.close.emit();
  }

  onSubmit() {
    if (this.addTopicForm.invalid) {
      this.addTopicForm.markAllAsTouched();
      return;
    }

    this.save.emit(this.addTopicForm.value);
    this.addTopicForm.reset();
  }

}
