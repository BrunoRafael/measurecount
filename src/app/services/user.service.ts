import { AuthService } from './auth.service';
import { HttpClientService } from './http.service';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

import * as _ from 'lodash'; 

@Injectable()
export class UserService {
    users: any [] = [{ 
        login: "saulo", 
        password: "admin#123",
        role: "admin",
        firstName: "Saulo",
        lastName: "Oliveira",
        sector: "",
        jobFunction: ""
    },
    { 
        login: "leandro", 
        password: "admin#123",
        role: "admin",
        firstName: "Leandro",
        lastName: "Padrão",
        sector: "",
        jobFunction: ""
    },
    { 
        login: "admin", 
        password: "admin#123",
        role: "admin",
        firstName: "",
        lastName: "",
        sector: "",
        jobFunction: ""
    },
    { 
        login: "sergio", 
        password: "admin#123",
        role: "admin",
        firstName: "Sérgio",
        lastName: "Autentico",
        sector: "",
        jobFunction: ""
    },
    { 
        login: "leocilia", 
        password: "admin#123",
        role: "admin",
        firstName: "Leocilia",
        lastName: "Pereira",
        sector: "",
        jobFunction: ""
    },
    { 
        login: "lucineia", 
        password: "admin#123",
        role: "admin",
        firstName: "Lucinéia",
        lastName: "Araujo",
        sector: "",
        jobFunction: ""
    },
    { 
        login: "operador", 
        password: "operador#123",
        role: "operator",
        firstName: "Usuário",
        lastName: "Padrão",
        sector: "",
        jobFunction: ""
    },
    { 
        login: "marta", 
        password: "admin#123",
        role: "admin",
        firstName: "Marta",
        lastName: "Padrão",
        sector: "",
        jobFunction: ""
    },
    { 
        login: "silvia", 
        password: "admin#123",
        role: "admin",
        firstName: "Silvia",
        lastName: "Padrão",
        sector: "",
        jobFunction: ""
    },
    { 
        login: "marcos", 
        password: "operador#123",
        role: "operator",
        firstName: "Marcos",
        lastName: "Padrão",
        sector: "",
        jobFunction: ""
    },
    { 
        login: "carol", 
        password: "operador#123",
        role: "operator",
        firstName: "Carol",
        lastName: "Padrão",
        sector: "",
        jobFunction: ""
    },
    { 
        login: "kalber", 
        password: "operador#123",
        role: "operator",
        firstName: "Kalber",
        lastName: "Padrão",
        sector: "",
        jobFunction: ""
    },
    { 
        login: "bianca", 
        password: "operador#123",
        role: "operator",
        firstName: "Bianca",
        lastName: "Padrão",
        sector: "",
        jobFunction: ""
    },
    { 
        login: "diego", 
        password: "operador#123",
        role: "operator",
        firstName: "Diego",
        lastName: "Padrão",
        sector: "",
        jobFunction: ""
    },
    { 
        login: "pedro", 
        password: "operador#123",
        role: "operator",
        firstName: "Pedro",
        lastName: "Padrão",
        sector: "",
        jobFunction: ""
    },
    { 
        login: "bruno", 
        password: "operador#123",
        role: "operator",
        firstName: "Bruno",
        lastName: "Padrão",
        sector: "",
        jobFunction: ""
    },
    { 
        login: "rafael", 
        password: "operador#123",
        role: "operator",
        firstName: "Rafael",
        lastName: "Padrão",
        sector: "",
        jobFunction: ""
    }
    ]

    constructor(private httpService: HttpClientService){}

    getUsers(){
        return new Observable((observer) => {
            observer.next(this.users);
        });
        //return this.httpService.getAllUsersInfo();
    }

    removeUser(user){
        //REMOVER APÓS REALIZAR COMUNICAÇÃO COM O SERVIDOR
        for (let i = 0; i < this.users.length; i++){
            let savedUser = this.users[i];
            if(_.isEqual(user, savedUser)){
                // REMOVER APÓS SE COMUNICAR COM O SERVIDOR
                return new Observable((observer) => {
                    observer.next(savedUser);
                })
            }
        }
    }

    updateUser(user){
        //REMOVER APÓS REALIZAR COMUNICAÇÃO COM O SERVIDOR
        for (let i = 0; i < this.users.length; i++){
            let savedUser = this.users[i];
            if(user["login"] == savedUser["login"]){
                return new Observable((observer) => {
                    this.users[i] = user
                    observer.next(user);
                })
            }
        }

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