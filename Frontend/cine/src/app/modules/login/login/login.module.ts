import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../pages/login/login.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';

import { ReactiveFormsModule } from '@angular/forms'; 


@NgModule({
  declarations: [],
  imports: [
    CommonModule,ReactiveFormsModule
  ]
})
export class LoginModule { }
