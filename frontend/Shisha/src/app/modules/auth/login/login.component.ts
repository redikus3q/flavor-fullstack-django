import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public subscription: Subscription | any;
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  public initRefresh: boolean = false;
  public loading: boolean = false;
  public fail: boolean = false;
  public artificialLag = 600;
  public animationShakeDuration = 300;

  constructor(
    private router: Router,
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.subscription = this.dataService.currentRefresh.subscribe(
      (initRefresh) => (this.initRefresh = initRefresh)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public login(): void {
    const body = this.loginForm.value;
    this.loading = true;
    setTimeout(() => {
      var response = this.authService.login(body).subscribe({
        next: (result) => {
          localStorage.setItem('Token', result['access']);
          this.authService.getUser().subscribe((user) => {
            localStorage.setItem(
              'Username',
              user['username']
            );
            this.dataService.changeRefresh(true);
          });
          this.fail = false;
          this.loading = false;
          this.router.navigate(['/flavors']);
        },
        error: (error) => {
          var form = document.getElementsByClassName('form-section')[0];
          this.fail = true;
          this.loading = false;
          form.classList.add('animate__shakeX');
          setTimeout(() => {
            form.classList.remove('animate__shakeX');
          }, this.animationShakeDuration);
        },
      });
    }, this.artificialLag);
  }

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  public goToRegister(): void {
    this.router.navigate(['auth/register']);
  }

  public onKeypressEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
    }
  }
}
