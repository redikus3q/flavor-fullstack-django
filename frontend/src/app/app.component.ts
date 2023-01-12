import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Shisha';

  public subscription : any;
  public refresh : boolean = true;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.subscription = this.dataService.currentRefresh.subscribe(initRefresh => {
      if(initRefresh){
        this.refresh = false;
        setTimeout(() => {
          this.refresh = true;
        }, 1);
        this.dataService.changeRefresh(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
