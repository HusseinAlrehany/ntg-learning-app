import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../models/category';
import { UserProfile } from '../../../../models/user-profile';
import { AdminService } from '../../service/admin.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  @Output() profileUpdated = new EventEmitter<UserProfile>();
  @Input() errorMessage = '';

  @Input() isEditMode = false;
  @Input() profile: UserProfile | null = null;

  categoryForm: FormGroup;
  editProfileForm!: FormGroup;
  
  constructor(private fb: FormBuilder, 
              private adminService: AdminService,
              private notificationService: NotificationService) {

    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.editProfileForm = this.fb.group({
      userId: [''],
      devName: ['', [Validators.required]],
      inProgress: [''],
      mastered: [''],
      notStarted: ['']
    });


  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profile'] && this.profile) {
      this.editProfileForm.patchValue({
        userId: this.profile.userId,
        devName: this.profile.devName,
        inProgress: this.profile.inProgress,
        mastered: this.profile.mastered,
        notStarted:this.profile.notStarted
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

  updateDevName(userId: number, devName: string){
    this.adminService.updateDevName(userId, devName).subscribe({
      next: (res)=> {
          this.notificationService.success(res.message);

          if(this.profile){
            this.profile = {...this.profile,devName: devName}
            this.profileUpdated.emit(this.profile);
          }
          
          this.close.emit();
      },
      error: (error: HttpErrorResponse)=> {
         this.errorMessage = error.error?.message ||
                          error.error?.error ||
                          'failed to update developer name';
      }
    });
  }

}


