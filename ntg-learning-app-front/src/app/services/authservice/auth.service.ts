import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SigninRequest } from '../../models/signin-request';
import { ApiResponse } from '../../models/api-response';
import { StoredUser } from '../../models/stored-user';
import { SignupRequest } from '../../models/signup-request';

const BASE_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  signin(signinRequest: SigninRequest): Observable<ApiResponse<StoredUser>>{

    return this.httpClient.post<ApiResponse<StoredUser>>(BASE_URL + `signin`, signinRequest, {
      withCredentials: true
    });
  }

  signup(signupRequest: SignupRequest): Observable<ApiResponse<string>>{
    return this.httpClient.post<ApiResponse<string>>(BASE_URL + `signup`, signupRequest, {
      withCredentials: true,
    });
  }

  logout(): Observable<ApiResponse<string>> {
     
    return this.httpClient.post<ApiResponse<string>>(BASE_URL + `logout`, {});
  }


}
