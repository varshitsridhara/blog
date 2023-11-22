import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  messages!:Message[];
users:[]=[];
constructor(private fb: FormBuilder, private userService: UserService, private router: Router ,private messageService:MessageService) {
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
          this.userService.currentUser=response.user;
          // Redirect or perform additional actions as needed
          this.router.navigate(['/user-dashboard']);
        },
        (error:any) => {
          // Handle login error
          console.log(error);
          this.messages = [
            { severity: 'error', summary: 'Error', detail: error.error.message },
        ];
    }
          //this.messageService.add({ severity: 'error', summary: 'Error',detail: 'Something went wrong'})
          // Display error message to the user or perform other actions
        
      );
    }
  }
}