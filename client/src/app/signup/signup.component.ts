import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { User } from '../user';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl:'./signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
 
  signupForm = this.fb.group({
  username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required, this.passwordMatchValidator.bind(this)]]
  });
  errormessages!:Message[];
  successmessages!:Message[];

  constructor(private fb: FormBuilder, private userService: UserService ,private messageService:MessageService ,private router:Router) {
   
  }

  get formControls() {
    return this.signupForm.controls;
  }

  get usernameInput() {
    return this.signupForm.get('username');
  }
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirm_password = control.get('confirm_password')?.value;
  
    // Check if both controls have values and they match
    if (password && confirm_password && password !== confirm_password) {
      return { 'passwordMismatch': true };
    }
  
    // If values match or one of the controls is null, return null (no error)
    return null;
  }
  signUp(){
    const postData={...this.signupForm.value};
    delete postData.confirm_password;
    this.userService.registerUser(postData as User).subscribe(
      response=>{
        console.log(response),
        this.router.navigate(['login'])
      },





















      
      error =>
      {
        console.log(error);
          this.errormessages = [
            { severity: 'error', summary: 'Error', detail: error.error.message },
        ];
       
      }
    )
  }
  
  // signUp() {
  //   if (this.signupForm.valid) {
  //     const user: User = {
  //       username: this.signupForm.value.username,
  //       email: this.signupForm.value.email,
  //       password: this.signupForm.value.password
  //     };

  //     this.userService.signUp(user).subscribe(
  //       () => {
  //         console.log('Signup successful..');
  //         alert('Signup successful! Welcome to our platform.');
  //       },
  //       (error: any) => {
  //         console.error('Signup error:', error);
  //       }
  //     );
  //   } else {
  //     // Handle the case when the form is not valid (display validation messages, etc.)
  //     console.log('Form is not valid. Displaying validation messages or taking other actions.');
  //   // For example, you can mark the form controls as touched to trigger validation messages
  //   this.signupForm.markAllAsTouched();
  //   }

  // }


   login() {
    // You can implement authentication logic here
    console.log('Username:',  this.signupForm.value.username);
    console.log('Password:', this.signupForm.value.password);
  
  }
 
}