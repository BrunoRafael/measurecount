import { User } from './../model/User';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpClientService{
    constructor(private http: HttpClient){}
    createUser(user: any){
        return this.http.post<any>(`${environment.serverUrl}/users`, user);
    }
}