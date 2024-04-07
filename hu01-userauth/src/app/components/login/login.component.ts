import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  hide: string = '';

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  get isEmailValid(): string | boolean {
    const control = this.loginForm.get('email');
    const isInvalid = control?.invalid && control.touched;

    if (isInvalid) {
      return control.hasError('required') ? 'This field is required' : 'Enter a valid email';
    }

    return false;
  }

  get isPassValid(): string | boolean {
    const control = this.loginForm.get('password');
    const isInvalid = control?.invalid && control.touched;

    if (isInvalid) {
      return 'This field is required';
    }

    return false;
  }

  logIn(): void {
    if (this.loginForm.invalid) {
      console.log("Error. Form data is invalid");
      this.toastr.error('The data provided is incorrect.', 'LogIn Error')
      return;
    };

    this.userService.logIn(this.loginForm.value)
      .then(response => {
        console.log(response);
        this.toastr.success('You have successfully logged in. Welcome!', 'LogIn Succes');
        this.router.navigate(['/home']);
      })
      .catch(err => {''
        console.log(err);
        this.toastr.error('Email or password are incorrect.', 'LogIn Error')
        this.loginForm.reset();
      });
  }
}
