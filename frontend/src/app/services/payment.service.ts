import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flavor } from '../interfaces/flavor';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  public url = 'http://127.0.0.1:8000/payment/create-checkout-session/';

  constructor(private http: HttpClient) {}

  public checkout(body: any): Observable<null> {
    return this.http.post<any>(this.url, body);
  }
}
