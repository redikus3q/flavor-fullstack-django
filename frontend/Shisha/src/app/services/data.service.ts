import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private refreshSource = new BehaviorSubject(false);
  public currentRefresh = this.refreshSource.asObservable();

  constructor() { }

  public changeRefresh(refresh: boolean){
    this.refreshSource.next(refresh);
  }
}
