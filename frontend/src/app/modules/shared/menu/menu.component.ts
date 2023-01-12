import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public user : any;
  private subscription : Subscription | any;

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

  goToFlavors(): void {
    this.router.navigate(['/flavors']);
  }

  goToAboutus(): void {
    this.router.navigate(['/aboutus']);
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  checkToken(): boolean {
    if(this.user == undefined){
      return false;
    }
    return true;
  }

  logOut(): void {
    localStorage.clear();
    localStorage.setItem("Token", "");
    this.router.navigate(['/flavors']).then(() => location.reload());
  }

  goToProfile(): void {
    this.router.navigate(['/user/profile']);
  }

}
