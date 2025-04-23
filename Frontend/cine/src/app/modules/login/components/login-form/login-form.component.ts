import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ILoginResponse } from '../../interfaces/login.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalstorageService } from 'src/app/core/services/localstorage/localstorage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  
  userForm: FormGroup;
  credentials = {
    user_name: '',
    password: ''
  };

  @Output() log=  new EventEmitter<void>(); 

  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private loginService: LoginService, 
    private toast: ToastrService, 
    private localStorageService: LocalstorageService
  ) {
    this.userForm = this.fb.group({
      user_name: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

    login(): void {
    if (!this.credentials.user_name || !this.credentials.password) {
      this.toast.warning("Por favor complete todos los campos");
      return;
    }

    this.loginService.login(this.credentials).subscribe({
      next: (response: ILoginResponse) => {
        if (!response || !response.token) {
          this.toast.error("Credenciales incorrectas");
          return;
        }
        this.log.emit(); 
        this.localStorageService.setItem("token", response.token);
        this.router.navigate(['/menu']);  
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.toast.error(error.error?.message || "Hubo un error en el servidor");
      }
    });
  }

  createLocalStorage(token: string): void {
    this.localStorageService.setItem("token", token);
  }

}