import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

}
