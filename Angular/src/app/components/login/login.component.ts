import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { StateService } from 'src/app/services/state.service';
import { UsersService } from 'src/app/services/users-service.service';
import jwt_decode from 'jwt-decode';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/models/MyErrorStateMatcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private usersService: UsersService,
    private router: Router,
    public stateService: StateService
  ) {}

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();

  public isErrorEmail: boolean = false;
  public errorEmail: string = '';

  public isErrorPassword: boolean = false;
  public errorPassword: string = '';

  public isError: boolean = true;

  public onEmailChanged(event: any): void {
    if (!this.validateEmail(event.target.value)) {
      this.isErrorEmail = true;
      this.errorEmail = 'Email format is incorrect';
    } else {
      this.isErrorEmail = false;
      this.errorEmail = '';
      this.userName = event.target.value;
    }
  }

  public onPasswordChanged(event: any): void {
    if (event.target.value.length < 4) {
      this.isErrorPassword = true;
      this.errorPassword = 'Password must be at least 4 charachters';
    } else {
      this.isErrorPassword = false;
      this.errorPassword = '';
      this.password = event.target.value;
    }
  }

  public validateEmail(email: string) {
    const regularExpression =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }

  public isEmptyField(): boolean {
    if (
      this.userName == '' ||
      this.password == '' ||
      this.password.length < 4 ||
      !this.validateEmail(this.userName) 
    ) {
      return true;
    }
    return false;
  }


  public userName: string = '';
  public password: string = '';

  public onLoginClicked(): void {
    let loginDetails = new UserLoginDetails(this.userName, this.password);
    const observable = this.usersService.login(loginDetails);

    observable.subscribe(
      (token: any) => {
        console.log(token);
        this.stateService.userName = this.userName;
        localStorage.setItem('userToken', token);
        this.stateService.isLogedIn = true;
        this.handleNavigation(token);
      },
      (serverErrorResponse: { message: string }) => {
        alert('error! ' + serverErrorResponse.message);
      }
    );
  }

  public onSignUpClicked():void{
    this.router.navigate(["registration"]);
  }

  handleNavigation(token: string) {
    let role = this.getDecodedAccessToken(token).role;
    if (role == 'Admin') {
      this.stateService.isAdmin = true;
      this.router.navigate(['/admin']);
    } else {
      this.stateService.isAdmin = false;
      this.router.navigate(['/customer']);
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
