import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  public url = 'https://localhost:44361/api/Comment';

  constructor(
    private http: HttpClient
  ) { }

  public postComment(body: any): Observable<Comment>{
    return this.http.post<any>(this.url, body);
  }

  public getComments(id: number): Observable<Comment[]>{
    return this.http.get<any>(`${this.url}/${id}`).pipe(map(response => response.comments));
  }

  public deleteComment(id: number): Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
