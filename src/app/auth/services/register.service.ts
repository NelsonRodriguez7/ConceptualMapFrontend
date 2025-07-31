import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ResponseWrapper } from '../../shared/interface/responseWrapper.interface';
import { RegisterRequest, RegisterResponse } from '../interfaces/register.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrl = environment.apiUrl;

  private http = inject(HttpClient)

  register(registerRequest: RegisterRequest) {
    return this.http.post<ResponseWrapper<RegisterResponse>>(`${this.baseUrl}/user/register`, registerRequest);
  }

}
