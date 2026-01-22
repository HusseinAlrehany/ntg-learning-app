import { Component, OnInit, signal } from '@angular/core';
import { DeveloperService } from '../../service/developer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../../services/authservice/auth.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { Router } from '@angular/router';
import { ManageTopicPopupComponent } from '../manage-topic-popup/manage-topic-popup.component';

@Component({
  selector: 'app-developer-dashboard',
  standalone: true,
  imports: [ManageTopicPopupComponent],
  templateUrl: './developer-dashboard.component.html',
  styleUrl: './developer-dashboard.component.css'
})
export class DeveloperDashboardComponent implements OnInit {

  errorMessage = '';
  isPopupOpen = signal(false);

  constructor(private devService: DeveloperService,
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
      next: (res)=> {
        console.log(res);
      },
      error: (error: HttpErrorResponse)=> {

    }

    })
  }


  logout(){
    this.authService.logout().subscribe({
      next: (res)=> {
        this.storageService.clearUserData();
        this.notificationService.success(res.message);
        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse)=> {
           this.errorMessage = error.error?.errorMessage || 
                           error.error?.error ||
                           'logut failed';
      }
    });
    

  }
  



}
