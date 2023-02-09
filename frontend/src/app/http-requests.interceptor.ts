import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class HttpReqInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService, private router: Router) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //console.log(httpRequest);
    var token = localStorage.getItem('Token');
    var skip = httpRequest.headers.get('skip');
    httpRequest = httpRequest.clone({
      headers: httpRequest.headers.delete('skip'),
    });
    // Don't add auth token in the header if the user is not logged in or for login/register requests
    if (skip == 'true' || token == null || token == '') {
      return next.handle(httpRequest);
    }
    // Don't check if the token is right when calling the method to check if the token is right (getuser)
    if (skip != 'getUser') {
      var response = this.authService.getUser().subscribe((result) => {
        if (!result) {
          localStorage.setItem('Token', '');
          localStorage.removeItem('Username');
          location.reload();
        }
      });
    }
    const headers = new HttpHeaders({
      Authorization: token,
    });
    httpRequest = httpRequest.clone({ headers });
    return next.handle(httpRequest);
  }
}
