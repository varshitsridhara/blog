import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5280/api/User'; // Replace with your actual API URL
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser :undefined;

  constructor(private httpClient: HttpClient, public router: Router) {}
  getUserByEmail(email:string){

  }

  login(user: User): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/login`, user);
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null);
  }

  logout() {
    localStorage.removeItem('access_token') ;
      this.router.navigate(['login']);
    }

 
  registerUser(user: User): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/register`, user); 
        
  }
  
}
