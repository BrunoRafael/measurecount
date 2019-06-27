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

    removeUser(user: User){
        return this.httpService.removeUser(user).pipe(
            map( response => {
                //if(response){
                    return user;
                //}
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

    login(login: String, password: String){       
        return this.httpService.login({login, password}).pipe(
            map( user => {
                if(user && user["token"]){
                    localStorage.setItem("loggedUser", JSON.stringify(user));
                    this.currentLoggedUserSubject.next(user);
                }

                return users;
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

    logout(){
        localStorage.removeItem("loggedUser");
        this.currentLoggedUserSubject.next(null);
        return new Observable(observer => {
            observer.next(null);
        });
    }

    
}