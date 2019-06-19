import { HttpClientService } from './http.service';
import { BehaviorSubject, Observable, throwError, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class UserService {
    users: any [] = [{ 
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

    constructor(){}

    registerUser(user){

        //REMOVER APÓS REALIZAR COMUNICAÇÃO COM O SERVIDOR
        for (let i = 0; i < this.users.length; i++){
            let savedUser = this.users[i];
            if(user["login"] == savedUser["login"]){
                // REMOVER APÓS SE COMUNICAR COM O SERVIDOR
                return new Observable((observer) => {
                    observer.error(new Error("Login de usuário já existe"));
                })
            }
        }
        
        this.users.push(user);
        return new Observable((observer) => {
            observer.next(user);
        });
        //REMOVER APÓS REALIZAR COMUNICAÇÃO COM O SERVIDOR

        /*return this.httpService.createUser(user).pipe(
            map( user => {
                if(user && user.token){
                    localStorage.setItem("loggedUser", JSON.stringify(user));
                    // REMOVER APÓS SE COMUNICAR COM O SERVIDOR
                    return new Observable((observer) => {
                        observer.next(user);
                    })
                }

                return user;
            }),
            catchError(err => {
                console.log('caught mapping error and rethrowing', err);
                return throwError(new Error("Usuário já cadastrado"));
            })
        )*/
        
    }
}