import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user : any;
  private subscription: Subscription | any;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    var username = localStorage.getItem("Username");
    if(username == undefined || username == ""){
      this.user = undefined;
    }
    else {
      this.user = localStorage.getItem("Username");
    }
  }

}
