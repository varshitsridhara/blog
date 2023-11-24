import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,RouterStateSnapshot,UrlTree,Router,CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';


import { Component } from '@angular/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-auth-guard',
  templateUrl: './auth-guard.component.html',
  styleUrls: ['./auth-guard.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class AuthGuardComponent {

constructor(
  public authService: UserService,
  public router: Router
) { }

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      // User is logged in, allow access
      return true;
    } else {
      // User is not logged in, navigate to the homepage
      alert("you are not allowed to access page");
      this.router.navigate(['/homepage']);
      return false;
    }
}
}