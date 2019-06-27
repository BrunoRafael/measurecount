import { Injectable } from '@angular/core';
import { UserService } from './../services/user.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private userService: UserService){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let user: User = this.userService.currentUserLogged();
        if(user && user.token){
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`
                }
            });
        }

        return next.handle(request);
    }
} 