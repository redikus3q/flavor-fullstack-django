import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Flavor } from '../interfaces/flavor';

@Injectable({
  providedIn: 'root'
})
export class FlavorsService {

  public url = 'http://127.0.0.1:8000/api/flavor/';

  constructor(
    private http: HttpClient
  ) { }

  public getAllFlavors(): Observable<Flavor[]>{
    return this.http.get<any>(this.url);
  }

  public getFlavorById(id: any): Observable<Flavor>{
    return this.http.get<Flavor>(`${this.url}${id}`);
  }
}
