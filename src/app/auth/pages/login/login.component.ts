import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { LoginRequest } from '../../interfaces/login.interface';
import { Ok_STATUS } from '../../../shared/constants/statusConstant';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = signal(false);
  errorMsg = signal('');

  private router = inject(Router)
  private loginService = inject(LoginService);
  private authService = inject(AuthService);

  constructor(
    private fb: FormBuilder
  ){
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(15)]],
      password: ['', Validators.required]
    });
  }

  sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/<[^>]*>?/gm, '') 
    .replace(/[^\w\-@.]/g, ''); 
  }

  async onSubmit(){
    if (this.loginForm.invalid){ 
      this.errorMsg.set('Error de usuario')
      return
    };

    this.isLoading.set(true);
    this.errorMsg.set('');

    const userName = this.sanitizeInput(this.loginForm.get('userName')?.value || '');
    const password = this.sanitizeInput(this.loginForm.get('password')?.value || '');
    const loginRequest: LoginRequest = {userName, password};
   
    try{
      const {body, status} = await firstValueFrom(this.loginService.login(loginRequest));
      
      if(status.code !== Ok_STATUS){
        this.errorMsg.set(status.description);
        this.isLoading.set(false);
      }

      this.authService.setAuthData(body?.token ?? '', body?.user.email ?? ''); 
      this.isLoading.set(false);
      this.router.navigate(['/']);

    }catch(err){
      this.errorMsg.set('Error del servidor, intentalo más tarde.');
      this.isLoading.set(false);
    }
  }

  goToRegistry(): void{
    this.router.navigate(['/auth/register']);
  }

}
