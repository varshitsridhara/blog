import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirm_password:string='';
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password:['',[Validators.required]],
confirm_password:['',[Validators.required]]
    })}
    passwordMatchValidator(formGroup: FormGroup) {
      const passwordControl = formGroup.get('password');
      const confirm_passwordControl = formGroup.get('confirm_password');
    
      if (passwordControl && confirm_passwordControl) {
        const password = passwordControl.value;
        const confirm_password = confirm_passwordControl.value;
    
        return password === confirm_password ? null : { passwordMismatch: true };
      }
    
      return null;
    }
  
  signup() {
    // You can implement signup logic here
    // Set it to false to hide the link
    console.log('Username:', this.username);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Confirm Password:',this.confirm_password);
    console.log('Signup form submitted:', this.signupForm.value);
  }
  
  login() {
    // You can implement authentication logic here
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }
 
}
