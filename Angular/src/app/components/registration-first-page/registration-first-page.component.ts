import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/models/MyErrorStateMatcher';
import { RegistrationData } from 'src/app/models/RegitrationData';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-registration-first-page',
  templateUrl: './registration-first-page.component.html',
  styleUrls: ['./registration-first-page.component.css'],
})
export class RegistrationFirstPageComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  constructor(public stateService: StateService,
    public router: Router) {}

  public registrtionData: RegistrationData = {
    id: '',
    email: '',
    password: '',
    city: '',
    street: '',
    firstName: '',
    lastName: '',
    zip: ''
  };

  public isValidIsraeliID(id: string) {
    var id = String(id).trim();
    if (id.length > 9 || id.length < 5) return false;

    // Pad string with zeros up to 9 digits
    id = id.length < 9 ? ('00000000' + id).slice(-9) : id;

    return (
      Array.from(id, Number).reduce((counter, digit, i) => {
        const step = digit * ((i % 2) + 1);
        return counter + (step > 9 ? step - 9 : step);
      }) %
        10 ===
      0
    );
  }

  public isPasswordConfirmed: boolean = false;

  public isErrorId: boolean = false;
  public errorId: string = '';

  public isErrorEmail: boolean = false;
  public errorEmail: string = '';

  public isErrorPassword: boolean = false;
  public errorPassword: string = '';

  public isErrorConfirmPassword: boolean = false;
  public errorConfirmPassword: string = '';

  public isError: boolean = false;
  public errorMessage: string = '';

  public confirmationPassword: string ='';

  public onIdChanged(event: any): void {
    if (!this.isValidIsraeliID(event.target.value)) {
      this.isErrorId = true;
      this.errorId = 'ID is invalid!';
      this.isError = true;
    } else {
      this.isErrorId = false;
      this.errorId = '';
      this.registrtionData.id = event.target.value;
      this.isError = false;
    }
  }

  public onEmailChanged(event: any): void {
    if (!this.validateEmail(event.target.value)) {
      this.isErrorEmail = true;
      this.errorEmail = 'Email format is incorrect';
    } else {
      this.isErrorEmail = false;
      this.errorEmail = '';
      this.registrtionData.email = event.target.value;
    }
  }

  public onPasswordChanged(event: any): void {
    this.registrtionData.password = event.target.value;
    if (event.target.value.length < 4) {
      this.isErrorPassword = true;
      this.errorPassword = 'Password must be at least 4 charachters';
    } else {
      this.isErrorPassword = false;
      this.errorPassword = '';
      this.registrtionData.password = event.target.value;
    }
  }

  public onConfirmPasswordChanged(event: any): void {
    if (event.target.value != this.registrtionData.password) {
      this.isErrorConfirmPassword = true;
      this.errorConfirmPassword =
        'Confirmation password dose not match the password';
    } else {
      this.isErrorConfirmPassword = false;
      this.errorConfirmPassword = '';
      this.confirmationPassword = event.target.value;
    }
  }

  public validateEmail(email: string) {
    const regularExpression =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }

  
  public isEmptyField(): boolean{
    if (this.registrtionData.id == '' ||
    this.registrtionData.email == '' ||
    this.registrtionData.password == '' ||
    this.confirmationPassword != this.registrtionData.password ||
    this.isErrorConfirmPassword ||
    this.isErrorId ||
    this.isErrorPassword ||
    this.isErrorEmail) {
      return true;
    }
    return false;
  }
  
  public onSubmitClicked(): void{
    this.stateService.registrationData = this.registrtionData;
    this.router.navigate(["setAddress"]);
  }
  ngOnInit(): void {}
}
