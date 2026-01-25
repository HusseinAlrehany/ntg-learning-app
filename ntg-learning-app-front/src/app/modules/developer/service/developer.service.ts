import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../models/api-response';

const BASE_URL = "http://localhost:8080/ntg-learning/dev/"

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  constructor(private httpClient: HttpClient) { }


  getAllCategoriesWithProgress(): Observable<any>{

    return this.httpClient.get(BASE_URL + `topics-with-progress`,{
      withCredentials: true
    });
  }


  updateTopicStatus(topicId: number, status: string): Observable<ApiResponse<String>>{
    
    return this.httpClient.put<ApiResponse<String>>(BASE_URL + `updateProgressStatus?topicId=${topicId}&status=${status}`, null, {
      withCredentials: true,
    });
  }

}
