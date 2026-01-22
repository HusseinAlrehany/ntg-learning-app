import { Injectable } from '@angular/core';
import { StoredUser } from '../../models/stored-user';

const USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  isSessionStorageAvailable(): boolean{
    return (
      typeof window !== 'undefined' &&
      typeof window.sessionStorage !== 'undefined'
    );
  }

   saveUser(user: StoredUser): void {
    if(this.isSessionStorageAvailable()){
      sessionStorage.removeItem(USER);
      sessionStorage.setItem(USER, JSON.stringify(user));
    }
  }

   getUser(): StoredUser | null{
    if(this.isSessionStorageAvailable()){
      return JSON.parse(sessionStorage.getItem(USER)!);
    }
    return null;
  }

   getUserRole(): string{
    
    return this.getUser()?.userRole || '';
  }

   getUserId(): string {
    return this.getUser()?.userId || '';
  }

   isAdminLoggedIn(): boolean{
    return this.getUserRole() === 'ADMIN';
  }

   isDeveloperLoggedIn(): boolean {
    return this.getUserRole() === 'DEVELOPER';
  }

   clearUserData(): void{
    if(this.isSessionStorageAvailable()){
      sessionStorage.removeItem(USER);
    }
  }

}
