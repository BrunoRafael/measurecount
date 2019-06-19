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

    sendRequest(url, type, body, params = null): Observable<any> {
        return this.http[type]<any>(url, { params: params }, body)
    }
}