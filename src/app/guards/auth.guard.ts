import { AuthService } from './../services/auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.currentUserLogged;
        if (currentUser) {
            // If a user is logged return true
            return true;
        }

        // Otherwise, the system logs out and forces the user to authenticate again 
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }


}