import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ResponseWrapper } from '../../shared/interface/responseWrapper.interface';
import { LoginRequest, LoginResponse } from '../interfaces/login.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.apiUrl;

  private http = inject(HttpClient)

  login(loginData: LoginRequest) {
    return this.http.post<ResponseWrapper<LoginResponse>>(`${this.baseUrl}/user/login`, loginData);
  }

}
