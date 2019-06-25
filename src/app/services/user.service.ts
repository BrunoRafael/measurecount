import { HttpClientService } from './http.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    users: any [] = [{ 
        login: "admin", 
        password: "admin#123",
        role: "admin",
        firstName: "Saulo",
        lastName: "Oliveira",
        sector: "---",
        jobFunction: "---"
    },
    { 
        login: "admin", 
        password: "admin#123",
        role: "admin",
        firstName: "Leandro",
        lastName: "Padrão",
        sector: "---",
        jobFunction: "---"
    },
    { 
        login: "admin", 
        password: "admin#123",
        role: "admin",
        firstName: "Usuário",
        lastName: "Padrão",
        sector: "---",
        jobFunction: "---"
    },
    { 
        login: "admin", 
        password: "admin#123",
        role: "admin",
        firstName: "Sérgio",
        lastName: "Autentico",
        sector: "---",
        jobFunction: "---"
    },
    { 
        login: "admin", 
        password: "admin#123",
        role: "admin",
        firstName: "Leocilia",
        lastName: "Pereira",
        sector: "---",
        jobFunction: "---"
    },
    { 
        login: "admin", 
        password: "admin#123",
        role: "admin",
        firstName: "Lucinéia",
        lastName: "Araujo",
        sector: "---",
        jobFunction: "---"
    },
    { 
        login: "operator", 
        password: "admin#123",
        role: "operator",
        firstName: "Usuário",
        lastName: "Padrão",
        sector: "---",
        jobFunction: "---"
    },
    { 
        login: "admin", 
        password: "admin#123",
        role: "admin",
        firstName: "Marta",
        lastName: "Padrão",
        sector: "---",
        jobFunction: "---"
    },
    { 
        login: "admin", 
        password: "admin#123",
        role: "admin",
        firstName: "Silvia",
        lastName: "Padrão",
        sector: "---",
        jobFunction: "---"
    },
    { 
        login: "operador", 
        password: "operador#123",
        role: "operator",
        firstName: "Marcos",
        lastName: "Padrão",
        sector: "---",
        jobFunction: "---"
    },
    { 
        login: "operador", 
        password: "operador#123",
        role: "operator",
        firstName: "Carol",
        lastName: "Padrão",
        sector: "---",
        jobFunction: "---"
    },
    { 
        login: "operador", 
        password: "operador#123",
        role: "operator",
        firstName: "Kalber",
        lastName: "Padrão",
        sector: "---",
        jobFunction: "---"
    },
    { 
        login: "operador", 
        password: "operador#123",
        role: "operator",
        firstName: "Bianca",
        lastName: "Padrão",
        sector: "---",
        jobFunction: "---"
    },
    { 
        login: "operador", 
        password: "operador#123",
        role: "operator",
        firstName: "Diego",
        lastName: "Padrão",
        sector: "---",
        jobFunction: "---"
    },
    { 
        login: "operador", 
        password: "operador#123",
        role: "operator",
        firstName: "Pedro",
        lastName: "Padrão",
        sector: "---",
        jobFunction: "---"
    },
    { 
        login: "operador", 
        password: "operador#123",
        role: "operator",
        firstName: "Bruno",
        lastName: "Padrão",
        sector: "---",
        jobFunction: "---"
    },
    { 
        login: "operador", 
        password: "operador#123",
        role: "operator",
        firstName: "Rafael",
        lastName: "Padrão",
        sector: "---",
        jobFunction: "---"
    }
    ]

    constructor(private httpService: HttpClientService){}

    getUsers(){
        return new Observable((observer) => {
            observer.next(this.users);
        });
        //return this.httpService.getAllUsersInfo();
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