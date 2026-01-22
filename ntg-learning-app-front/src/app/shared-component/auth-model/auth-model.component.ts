import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authservice/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StoredUser } from '../../models/stored-user';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-auth-model',
  standalone: true ,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './auth-model.component.html',
  styleUrl: './auth-model.component.css'
})
export class AuthModelComponent implements OnInit{

  authForm!: FormGroup;

  @Input() mode: 'signin' | 'signup' = 'signin';
  @Output() close = new EventEmitter<void>();

  loading = false;
  errorMessage = '';

  isAdminLoggedIn: boolean = this.storageService.isAdminLoggedIn();
  isPatientLoggedIn: boolean =  this.storageService.isDeveloperLoggedIn();


  switchMode(mode: 'signin' | 'signup') {
    this.mode = mode;
    this.errorMessage = '';
    this.authForm.reset();
    this.updateValidators();
  }

  constructor(private formBuilder: FormBuilder, 
              private router: Router,
              private authService: AuthService,
              private storageService: StorageService,
              private notificationService: NotificationService){
      
    this.buildTheForm();

  }
  ngOnInit(): void {
    this.router.events.subscribe(event=> {
      this.isAdminLoggedIn =  this.storageService.isAdminLoggedIn();
      this.isPatientLoggedIn =  this.storageService.isDeveloperLoggedIn();
    })
  }

  private buildTheForm(){
    this.authForm = this.formBuilder.group({  
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.updateValidators();
  }

  private updateValidators() {
  const nameCtrl = this.authForm.get('fullName');

  if (this.mode === 'signup') {
    nameCtrl?.setValidators([Validators.required]);
  } else {
    nameCtrl?.clearValidators();
    nameCtrl?.reset();
  }

  nameCtrl?.updateValueAndValidity();
}

  onSubmit(){
    if(this.authForm.invalid) {
       this.authForm.markAllAsTouched();
       return;
    }
    if(this.mode === 'signin'){
      this.signin();
    }else {
      this.signup();
    }
  }


  signup() {
    this.authService.signup(this.authForm.value).subscribe({
      next: (res)=> {
         console.log("Sign up response " , res);
         this.notificationService.success('Signup successful');
         this.close.emit();
         this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse)=> {
        this.errorMessage = 
          error.error?.message ||
          error.error?.error ||
          'sign up failed, try again';

      }
    });
  }
  signin() {
    
    this.authService.signin(this.authForm.value).subscribe({
      next: (res)=> {
          if(res != null && res.payload?.userId != null){

            const user: StoredUser = {
              userId: res.payload?.userId,
              userRole: res.payload?.userRole
            }

            this.storageService.saveUser(user);
            this.notificationService.success('Login successful');
            this.close.emit();

            if(this.storageService.isAdminLoggedIn()){
              this.router.navigate(['/admin/dashboard']);
            } else {
              this.router.navigate(['/developer/dashboard']);
            }

          
          }
      },

      error: (error: HttpErrorResponse)=> {
          
          this.errorMessage = 
             error.error?.message || 
             error.error?.error ||
             'Invalid email or';
      }
    });
    

}
}
