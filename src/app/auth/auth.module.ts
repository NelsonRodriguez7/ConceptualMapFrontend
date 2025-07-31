import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth.routing.module';
import { AuthService } from './services/auth.service';
import { LoginService } from './services/login.service';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterService } from './services/register.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,  
    FormsModule,  
    RouterModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    LoginService,
    RegisterService
  ]

})
export class AuthModule { }
