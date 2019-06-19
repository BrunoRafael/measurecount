import { UserService } from 'src/app/services/user.service';
import { HttpClientService } from './http.service';
import { BehaviorSubject, Observable, throwError, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
    currentLoggedUserSubject: BehaviorSubject<User>;
    currentLoggedUser: Observable<User>;

    constructor(private httpService: HttpClientService, private userService: UserService){
        this.currentLoggedUserSubject = new BehaviorSubject<User>( JSON.parse( localStorage.getItem("loggedUser") ) );
        this.currentLoggedUser = this.currentLoggedUserSubject.asObservable();
    }

    public get currentUserLogged(): User {
        return this.currentLoggedUserSubject.value;
    }

    login(login: String, password: String){
        // REMOVER APÓS FAZER COMUNICAÇÃO COM O SERVIDOR
        for(let i = 0; i < this.userService.users.length; i++){
            let user = this.userService.users[i];
            if(login == user.login && password == user.password){
                localStorage.setItem("loggedUser", JSON.stringify(user));
                this.currentLoggedUserSubject.next(user);
                return new Observable(observer => {
                    observer.next(user);
                });
            }
            
        }
        // REMOVER APÓS FAZER COMUNICAÇÃO COM O SERVIDOR
        
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