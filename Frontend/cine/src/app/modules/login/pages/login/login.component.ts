import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { UserForm } from '../../models/user.model';
import { IUserResponse } from '../../interfaces/user.interface';
import { ILoginResponse } from '../../interfaces/login.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  users: any[] = [];
  selectedUser: any = {}; 
  userForm: FormGroup; 
  isRegister:boolean=false;
  pageLogin: boolean = true; 
  registerForm: FormGroup;  
  constructor(private userService: LoginService, private fb: FormBuilder, private toast:ToastrService) { 
    this.userForm = this.fb.group(new UserForm());

    this.registerForm = this.fb.group({
      user_name: ['', Validators.required],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      ocupacion: ['', Validators.required],
      universidad: ['', Validators.required],
      trabajo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

  
    
  } 

  @Output() log = new EventEmitter<void>(); 
  
  ngOnInit(): void {
  } 
 

  reenviarLogin() {
    this.log.emit();  
  }
}
