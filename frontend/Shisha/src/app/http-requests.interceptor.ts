import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpReqInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log(httpRequest);
    var token = localStorage.getItem("Token");
    var skip = httpRequest.headers.get("skip");
    httpRequest = httpRequest.clone({
      headers: httpRequest.headers.delete('skip')
    });
    if(skip == "true" || token == null || token == ""){
      return next.handle(httpRequest);
    }
    // var response = this.authService.getUser().subscribe(result => {
    //   if(!result){
    //     localStorage.setItem("Token", "");
    //   }
    // });
    const headers = new HttpHeaders({
      'Authorization': token
    });
    httpRequest = httpRequest.clone({headers});
    return next.handle(httpRequest);
  }
}