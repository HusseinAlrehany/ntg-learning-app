import { Component, OnInit, signal } from '@angular/core';
import { ManageProfilePopupComponent } from '../manage-profile-popup/manage-profile-popup.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/authservice/auth.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../../services/notification/notification.service';
import { AdminService } from '../../service/admin.service';
import { Category } from '../../../../models/category';
import { UserProfile } from '../../../../models/user-profile';
import { AddTopicPopupComponent } from '../add-topic-popup/add-topic-popup.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ManageProfilePopupComponent, CommonModule, RouterLink, AddTopicPopupComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{

  errorMessage = '';
  
  profilesList: any[] = [];
  isPopupOpen = signal(false);
  isAddTopicOpen = signal(false);
  selectedProfile = signal<UserProfile | null>(null);


  constructor(private authService: AuthService, 
              private storageService: StorageService,
              private router: Router,
              private notificationService: NotificationService,
              private adminService: AdminService){}


  ngOnInit(): void {
    this.profiles();
  }

openAddCategoryPopup() {
  //this.isAddCategoryOpen = true;
  this.selectedProfile.set(null);
  this.isPopupOpen.set(true);
}

openAddTopicPopup() {
  this.errorMessage = '';
  this.isAddTopicOpen.set(true);
}

openEditPopup(userId: number){
  this.errorMessage = '';
  this.isPopupOpen.set(true);

  this.adminService.getProfileById(userId).subscribe({
    next: (res) => {
      this.selectedProfile.set(res);
    },
    error: (err) => {
      this.errorMessage = 'Failed to load profile';
      this.isPopupOpen.set(false);
    }
  });

}

closePopup(){
  this.selectedProfile.set(null);
  this.isPopupOpen.set(false);
  this.errorMessage = '';
}

closeTopicPopup() {
  this.isAddTopicOpen.set(false);
  this.errorMessage = '';
}

handleCategorySave(category: Category) {
  console.log('New category:', category);
  
  this.adminService.addCategory(category).subscribe({
    next: (res)=> {
      this.notificationService.success(res.message);
      this.closePopup();
      this.router.navigate(['/admin/view-topics']);
      
    },
    error: (error: HttpErrorResponse)=> {
      this.errorMessage = error.error?.message ||
                           error.error?.error ||
                          'failed to add category';
    }
  });
    
}

handleTopicSave(topic: any) {
  this.adminService.addTopic(topic).subscribe({
    next: (res) => {
      this.notificationService.success(res.message);
      this.closeTopicPopup();
      this.router.navigate(['/admin/view-topics']);
    },
    error: (error: HttpErrorResponse) => {
      this.errorMessage = error.error?.message ||
                          error.error?.error ||
                          'failed to add topic';
    }
  });
}

profiles(){
   this.profilesList = [];
   this.adminService.getAllUsersWithOerAllProgress().subscribe({
    next: (res)=> {
      this.profilesList = res;
      console.log("Profiles are ", res);
    }, 
    error: (error: HttpErrorResponse)=> {
      this.errorMessage = error.error?.message ||
                           error.error?.error ||
                          'failed to get profiles';
    }
  })
}

deleteUserById(userId: number){
  
   this.adminService.deleteUserProfileById(userId).subscribe({
    next: (res)=> {
      this.notificationService.success(res.message);
      this.profiles();
    },
    error: (error: HttpErrorResponse)=> {
      this.errorMessage = error.error?.message ||
                           error.error?.error ||
                          'failed to delete profile';
    this.profiles();                      
    }
   })

   
}

//emit profile updates to the user for instant update of UI
onProfileUpdate(updatedProfile: UserProfile){

   const index = this.profilesList.findIndex(p=> p.userId === updatedProfile.userId);
   if(index !== -1){
     this.profilesList[index] = {
      ...this.profilesList[index],
      devName: updatedProfile.devName,
      userName: updatedProfile.devName}

      this.profilesList = [...this.profilesList];
   }

   this.selectedProfile.set(updatedProfile);
}

}
