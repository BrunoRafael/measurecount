import { HttpClientService } from './http.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import * as _ from 'lodash'; 
import { map, catchError } from 'rxjs/operators';
import { User } from '../model/User';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserService {
    currentLoggedUserSubject: BehaviorSubject<any>;
    currentLoggedUser: Observable<any>;

    constructor(private httpService: HttpClientService){
        this.currentLoggedUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("loggedUser")));
        this.currentLoggedUser = this.currentLoggedUserSubject.asObservable();
    }

    public currentUserLogged(): User {
        return this.currentLoggedUserSubject.value;
    }

    createUser(user: User){
        return this.httpService.createUser(user).pipe(
            map( response => {
                return response;
            }),
            catchError((err: HttpErrorResponse) => {
                if(err.status == 401){
                    return throwError(new Error("Login ou senha inválidos"));
                }

                return throwError(err.message);
            })
        )    
    }

    logout(){
        localStorage.removeItem("loggedUser");
        this.currentLoggedUserSubject.next(null);
        return new Observable(observer => {
            observer.next(null);
        });
    }

    
}