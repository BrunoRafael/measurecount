import { HttpClientService } from './http.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import * as _ from 'lodash'; 
import { map, catchError } from 'rxjs/operators';
import { User } from '../model/User';

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
            catchError(err => {
                console.log('caught mapping error and rethrowing', err);
                return throwError(new Error("Usuário já cadastrado"));
            })
        )    
    }

    updateUser(user: User){
        return this.httpService.updateUser(user).pipe(
            map( response => {
                return user;
            }),
            catchError(err => {
                console.log('caught mapping error and rethrowing', err);
                return throwError(new Error("Usuário já cadastrado"));
            })
        )
    }

    getAllUsers(){
        return this.httpService.getAllUsers().pipe(
            map( users => {
                if(users){
                    for(let i in users){
                        localStorage.setItem(`${users[i].login}` , JSON.stringify(users[i]));
                    }
                }

                return users;
            }),
            catchError(err => {
                console.log('caught mapping error and rethrowing', err);
                return throwError(new Error("Usuário já cadastrado"));
            })
        )
    }

    
}