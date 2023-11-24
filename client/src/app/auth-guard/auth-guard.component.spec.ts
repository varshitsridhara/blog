import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardComponent implements CanActivate {

  invalidCredentialsMessage: string = ''; // Add a property to store the message

  constructor(
    public authService: UserService,
    public router: Router,
    private toastr: ToastrService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn) {
      this.invalidCredentialsMessage = 'Invalid credentials'; // Set the message
      this.toastr.error(this.invalidCredentialsMessage, 'Authentication Error'); // Display the message using Toastr

      // Return true to allow access to the route
      return true;
    }

    // Clear the message if the user is logged in
    this.invalidCredentialsMessage = '';
    return true;
  }
}
