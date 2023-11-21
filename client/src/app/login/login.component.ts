import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
users:[]=[];
constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  this.loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.userService.login(credentials).subscribe(
        (response:any) => {
          // Handle successful login
          console.log('Login successful', response);
          localStorage.setItem("access_token",response.token);
          // Redirect or perform additional actions as needed
          this.router.navigate(['/userdashboard']);
        },
        (error:any) => {
          // Handle login error
          console.error('Login failed', error);
          // Display error message to the user or perform other actions
        }
      );
    }
  }
}