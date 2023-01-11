import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url = 'http://127.0.0.1:8000/authentication';

  constructor(
    private http: HttpClient
  ) { }

  public login(body: any): Observable<any>{
    return this.http.post<any>(this.url + '/login/', body, {headers:{skip:"true"}});
  }

  public register(body: any): Observable<any>{
    return this.http.post<any>(this.url + '/register/', body, {headers:{skip:"true"}});
  }

  public getUser(): Observable<any>{
    return this.http.get<any>(this.url + "/getUser");
  }

}
