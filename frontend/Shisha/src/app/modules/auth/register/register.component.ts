import { ERROR_COMPONENT_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  PatternValidator,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public subscription: Subscription | any;
  public artificialLag = 600;
  public animationShakeDuration = 300;

  public registerForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, this.emailValidator()]),
    password: new FormControl('', [
      Validators.minLength(5),
      Validators.required,
      this.passwordValidator(),
    ]),
  });

  public fail: boolean = false;
  public loading: boolean = false;
  public emailExists: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  public register(): void {
    const body = this.registerForm.value;
    this.loading = true;
    setTimeout(() => {
      var response = this.authService.register(body).subscribe({
        next: (result) => {
          localStorage.setItem('Token', result['access']);
          this.authService.getUser().subscribe((user) => {
            localStorage.setItem(
              'Username',
              this.registerForm.value.username
            );
            this.dataService.changeRefresh(true);
          });
          this.fail = false;
          this.loading = false;
          this.router.navigate(['/flavors']);
        },

        error: (error) => {
          if (
            error.error ==
            'There already is an user registered with that email!'
          ) {
            this.emailExists = true;
            this.registerForm.controls['email'].setErrors({ incorrect: true });
          }
          var form = document.getElementsByClassName('form-section')[0];
          form.classList.add('animate__shakeX');
          setTimeout(() => {
            form.classList.remove('animate__shakeX');
          }, this.animationShakeDuration);
          this.fail = true;
          this.loading = false;
        },
      });
    }, this.artificialLag);
  }

  get username(): AbstractControl | null {
    return this.registerForm.get('username');
  }

  get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  public passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);

      const hasLowerCase = /[a-z]+/.test(value);

      const hasNumeric = /[0-9]+/.test(value);

      const hasSpecial = /[!-\/:-@[-`{-~]/.test(value);

      const passwordValid =
        hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;

      const errorLog = {
        upper: hasUpperCase,
        lower: hasLowerCase,
        numeric: hasNumeric,
        special: hasSpecial,
      };

      return !passwordValid ? errorLog : null;
    };
  }

  public emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const hasEmailForm = /[@](.*)[.](.+)/.test(value);

      const emailValid = hasEmailForm;

      const errorLog = {
        emailForm: hasEmailForm,
      };

      return !emailValid ? errorLog : null;
    };
  }

  public getPasswordErrors(): String[] {
    const controlErrors: ValidationErrors | null | undefined =
      this.registerForm.get('password')?.errors;
    var result: String[] = [];
    if (controlErrors != null && controlErrors != undefined) {
      Object.keys(controlErrors).forEach((keyError) => {
        if (controlErrors[keyError] == false && keyError == 'upper') {
          result.push('Your password must contain an uppercase letter.');
        } else if (controlErrors[keyError] == false && keyError == 'lower') {
          result.push('Your password must contain a lowercase letter.');
        } else if (controlErrors[keyError] == false && keyError == 'numeric') {
          result.push('Your password must contain a number.');
        } else if (controlErrors[keyError] == false && keyError == 'special') {
          result.push('Your password must contain a special character.');
        } else if (keyError == 'minlength') {
          result.push(
            'Your password must be at least ' +
              controlErrors[keyError].requiredLength +
              ' characters long.'
          );
        }
      });
    }
    return result;
  }

  public checkName(): boolean {
    if (
      this.registerForm.controls['username'].invalid &&
      (this.registerForm.controls['username'].dirty ||
        this.registerForm.controls['username'].touched)
    ) {
      return true;
    }
    return false;
  }

  public checkValidity(): boolean {
    if (
      this.registerForm.controls['username'].invalid ||
      this.registerForm.controls['email'].invalid ||
      this.registerForm.controls['password'].invalid
    ) {
      return true;
    }
    return false;
  }
}
