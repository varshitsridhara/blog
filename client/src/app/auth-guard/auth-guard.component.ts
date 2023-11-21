import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,RouterStateSnapshot,UrlTree,Router,CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';


import { Component } from '@angular/core';

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
  if (this.authService.isLoggedIn !== true) {
    window.alert("Access not allowed!");
    this.router.navigate(['users/login'])
  }
  return true;
}
}