import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../models/api-response';
import { Category } from '../../../models/category';
import { Observable } from 'rxjs';
import { UserProfile } from '../../../models/user-profile';

const BASE_URL = "http://localhost:8080/ntg-learning/admin/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }


  addCategory(category : Category): Observable<ApiResponse<string>>{

    return this.httpClient.post<ApiResponse<string>>(BASE_URL + `add-category`, category, {
      withCredentials: true,
    });
  }

  getAllUsersWithOerAllProgress(): Observable<any> {
    return this.httpClient.get(BASE_URL + `get-all-with-overall-progress`, {
      withCredentials: true
    });
  }

  deleteUserProfileById(userId: number): Observable<ApiResponse<string>>{

    return this.httpClient.delete<ApiResponse<string>>(BASE_URL + `deleteUserById?userId=${userId}`, {
      withCredentials: true,
    });
  }

  getProfileById(userId: number): Observable<UserProfile>{
    return this.httpClient.get<UserProfile>(BASE_URL + `get-user-profile?userId=${userId}`, {
      withCredentials: true,
    });
  }

  getAllTopics(): Observable<any>{

    return this.httpClient.get(BASE_URL + `manage-topics`, {
      withCredentials: true,
    });
  }

  deleteCategoryById(categoryId:number): Observable<ApiResponse<String>>{

    return this.httpClient.delete<ApiResponse<String>>(BASE_URL + `deleteCategory?categoryId=${categoryId}`, {
      withCredentials: true,
    });
  }

  deleteTopicById(topicId:number): Observable<ApiResponse<String>>{

    return this.httpClient.delete<ApiResponse<String>>(BASE_URL + `deleteTopic?topicId=${topicId}`, {
      withCredentials: true,
    });
  }
}
