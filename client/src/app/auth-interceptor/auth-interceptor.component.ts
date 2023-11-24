import {  Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { UserService } from '../services/user.service';



@Injectable()
export class AuthInterceptorComponent  implements HttpInterceptor {
    constructor(private authService: UserService) { }

    
    intercept(req: HttpRequest<any>, next: HttpHandler) {  
          const accessToken = this.authService.getAccessToken();
        console.log(accessToken)
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}` 
            }
        });
        return next.handle(req);
    }
}

