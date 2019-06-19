import { HttpClientService } from './http.service';
import { BehaviorSubject, Observable, throwError, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
    currentLoggedUserSubject: BehaviorSubject<User>;
    currentLoggedUser: Observable<User>;

    defaultUsers: any [] = [{ 
        login: "admin", 
        password: "admin#123",
        role: "admin"
    },
    { 
        login: "operador", 
        password: "operador#123",
        role: "operator"
    },
    ]

    constructor(private httpService: HttpClientService){
        this.currentLoggedUserSubject = new BehaviorSubject<User>( JSON.parse( localStorage.getItem("loggedUser") ) );
        this.currentLoggedUser = this.currentLoggedUserSubject.asObservable();
    }

    public get currentUserLogged(): User {
        return this.currentLoggedUserSubject.value;
    }

    login(login: String, password: String){
        for(let i = 0; i < this.defaultUsers.length; i++){
            let user = this.defaultUsers[i];
            if(login == user.login && password == user.password){
                localStorage.setItem("loggedUser", JSON.stringify(user));
                this.currentLoggedUserSubject.next(user);
                return new Observable(observer => {
                    observer.next(user);
                });
            }
            
        }
        
        return this.httpService.login({login, password}).pipe(
            map( user => {
                if(user && user.token){
                    localStorage.setItem("loggedUser", JSON.stringify(user));
                    this.currentLoggedUserSubject.next(user);
                }

                return user;
            }),
            catchError(err => {
                console.log('caught mapping error and rethrowing', err);
                return throwError(new Error("Login ou senha inválidos"));
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