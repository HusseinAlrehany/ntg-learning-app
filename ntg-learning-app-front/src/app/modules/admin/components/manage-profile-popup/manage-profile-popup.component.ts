import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../models/category';
import { UserProfile } from '../../../../models/user-profile';

@Component({
  selector: 'app-manage-profile-popup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './manage-profile-popup.component.html',
  styleUrl: './manage-profile-popup.component.css'
})
export class ManageProfilePopupComponent implements OnChanges{

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Category>();
  @Input() errorMessage = '';

  @Input() isEditMode = false;
  @Input() profile: UserProfile | null = null;

  categoryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profile'] && this.profile) {
      this.categoryForm.patchValue({
        name: this.profile.devName
      });
    }

    if (!this.isEditMode) {
      this.categoryForm.reset();
    }
  }

  onCancel() {
    this.categoryForm.reset();
    this.close.emit();
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    this.save.emit(this.categoryForm.value);
    this.categoryForm.reset();
  }

}


