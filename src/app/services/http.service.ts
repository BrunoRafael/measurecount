import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpClientService{
    
    constructor(private http: HttpClient){}

    createUser(user: any){
        return this.http.post<any>(`${environment.serverUrl}/users`, user);
    }

    updateUser(user: any){
        return this.http.put<any>(`${environment.serverUrl}/users/${user.id}`, user);
    }

    removeUser(user: any){
        return this.http.delete<any>(`${environment.serverUrl}/users/${user.id}`);
    }

    getAllUsers(){
        return this.http.get<any>(`${environment.serverUrl}/users`);
    }

    login (credentials: any){
        return this.http.post<any>(`${environment.serverUrl}/login`, credentials);
    }
}