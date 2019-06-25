import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpClientService{
    constructor(private http: HttpClient){}
    
    login (credentials: any){
        return this.sendRequest(`${environment.serverUrl}/authentication`, "post", credentials);
    }
    createUser(user: any){
        return this.sendRequest(`${environment.serverUrl}/users/create`, "post", user);
    }

    updateUser(user: any){
        return this.sendRequest(`${environment.serverUrl}/users/update`, "put", user);
    }
    
    getAllUsersInfo(){
        return this.sendRequest(`${environment.serverUrl}/users`, "get");
    }

    sendRequest(url, type, body=null, params = null): Observable<any> {
        return this.http[type]<any>(url, { params: params }, body)
    }
}