import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,AbstractControl, ValidationErrors } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { RegisterService } from '../../services/register.service';
import { RegisterRequest } from '../../interfaces/register.interface';
import { Ok_STATUS } from '../../../shared/constants/statusConstant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm: FormGroup;
  isLoading = signal(false);
  errorMsg = signal('');

  private router = inject(Router);
  private registerService = inject(RegisterService);

  constructor(
    private fb: FormBuilder
  ){
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]]
    },{
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  };

  sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/<[^>]*>?/gm, '')  
      .replace(/[^\w\-@.]/g, ''); 
  };

  goToLogin(){
    this.router.navigate(['/auth/login']);
  };

  async onSubmit(): Promise<void> {
    this.isLoading.set(true);
    
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const sanitizedData: RegisterRequest = {
      userName: this.sanitizeInput(this.registerForm.get('userName')?.value),
      email: this.sanitizeInput(this.registerForm.get('email')?.value),
      password: this.sanitizeInput(this.registerForm.get('password')?.value),
      phone: this.sanitizeInput(this.registerForm.get('phone')?.value),
    };

    try{

      const {body, status} = await firstValueFrom(this.registerService.register(sanitizedData));

      if(status.code !== Ok_STATUS){
        this.errorMsg.set(status.description);
        this.isLoading.set(false);
      }

      this.isLoading.set(false);
      this.router.navigate(['/auth/login']);

    }catch(err){
      this.errorMsg.set('Error del servidor, intentalo más tarde.');
      this.isLoading.set(false);
    }
   
  };


}
