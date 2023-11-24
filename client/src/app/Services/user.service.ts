import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../user';
import { Blog } from '../Models/Blog';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://blogapi20231122150631.azurewebsites.net/api/user'; // Replace with your actual API URL
  headers = new HttpHeaders().set('Content-Type', 'application/json');
private isloggedIn:boolean=false;

  constructor(private httpClient: HttpClient, public router: Router) {}
  
  login(user: User): Observable<any> {
   
    return this.httpClient.post(`${this.apiUrl}/login`, user);
   
  
  }
 


  getAccessToken() {
    return localStorage.getItem('access_token');
  }

isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null;
    
  }
get currentUser(){
  const user=localStorage.getItem("user")!
  return JSON.parse(user);
}
  logout() {
    console.log("successfully logout");
    localStorage.removeItem('access_token') ;
    localStorage.removeItem("user")

      this.router.navigate(['homepage']);
    }

 
  registerUser(user: User): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/register`, user); 
  }}