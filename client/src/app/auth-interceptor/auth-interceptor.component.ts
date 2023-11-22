import { Component, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-auth-interceptor',
  templateUrl: './auth-interceptor.component.html',
  styleUrls: ['./auth-interceptor.component.css']
})
@Injectable()
export class AuthInterceptorComponent  implements HttpInterceptor {
    constructor(private authService: UserService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.authService.getAccessToken();
        req = req.clone({
            setHeaders: {
                Authorization: `JWT $[accessToken}` 
            }
        });
        return next.handle(req);
    }
}

