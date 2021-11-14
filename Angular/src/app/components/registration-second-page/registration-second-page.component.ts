import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationData } from 'src/app/models/RegitrationData';
import { StateService } from 'src/app/services/state.service';
import { UsersService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-registration-second-page',
  templateUrl: './registration-second-page.component.html',
  styleUrls: ['./registration-second-page.component.css'],
})
export class RegistrationSecondPageComponent implements OnInit {
  constructor(public stateService: StateService, public router: Router, public usersService: UsersService) {}

  public registrtionData: RegistrationData = {
    id: this.stateService.registrationData.id,
    email: this.stateService.registrationData.email,
    password: this.stateService.registrationData.password,
    city: '',
    street: '',
    firstName: '',
    lastName: '',
    zip: ''
  };

  public isFirstNameConfirmed: boolean = false;

  public isErrorCity: boolean = false;
  public errorCity: string = '';

  public isErrorStreet: boolean = false;
  public errorStreet: string = '';

  public isErrorFirstName: boolean = false;
  public errorFirstName: string = '';

  public isErrorLastName: boolean = false;
  public errorLastName: string = '';

  public isErrorZip: boolean = false;
  public errorZip: string = '';

  public isError: boolean = false;
  public errorMessage: string = '';

  public confirmationFirstName: string = '';

  public onCityChanged(event: any): void {
    if (event.target.value == '') {
      this.isErrorCity = true;
      this.errorCity = "City field is requiered!"
    }else if(event.target.value.length > 15){
      this.isErrorCity = true;
      this.errorCity = "Maximum charachters for this field is limited to 15"
    }else{
      this.isErrorCity = false;
      this.errorCity = '';
      this.registrtionData.city = event.target.value;
    }
  }

  public onStreetChanged(event: any): void {
    if (event.target.value == '') {
      this.isErrorStreet = true;
      this.errorStreet = "Street field is requiered!"
    }else if(event.target.value.length > 15){
      this.isErrorStreet = true;
      this.errorStreet = "Maximum charachters for this field is limited to 15"
    }else{
      this.isErrorStreet = false;
      this.errorStreet = '';
      this.registrtionData.street = event.target.value;
    }
  }

  public onFirstNameChanged(event: any): void {
    if (event.target.value == '') {
      this.isErrorFirstName = true;
      this.errorFirstName = "FirstName field is requiered!"
    }else if(event.target.value.length > 15){
      this.isErrorFirstName = true;
      this.errorFirstName = "Maximum charachters for this field is limited to 15"
    }else{
      this.isErrorFirstName = false;
      this.errorFirstName = '';
      this.registrtionData.firstName = event.target.value;
    }
  }

  public onLastNameChanged(event: any): void {
    if (event.target.value == '') {
      this.isErrorLastName = true;
      this.errorLastName = "LastName field is requiered!"
    }else if(event.target.value.length > 15){
      this.isErrorLastName = true;
      this.errorLastName = "Maximum charachters for this field is limited to 15"
    }else{
      this.isErrorLastName = false;
      this.errorLastName = '';
      this.registrtionData.lastName = event.target.value;
    }
  }

  public onZipChanged(event: any): void {
    if (event.target.value == '') {
      this.isErrorZip = true;
      this.errorZip = "Zip field is requiered!"
    }else if(event.target.value.length > 6){
      this.isErrorZip = true;
      this.errorZip = "Maximum charachters for this field is limited to 6"
    }else{
      this.isErrorZip = false;
      this.errorZip = '';
      this.registrtionData.zip = event.target.value;
    }
  }

  public isEmptyField(): boolean {
    if (
      this.registrtionData.city == '' ||
      this.registrtionData.street == '' ||
      this.registrtionData.firstName == '' ||
      this.registrtionData.lastName == '' ||
      this.isErrorLastName ||
      this.isErrorCity ||
      this.isErrorFirstName ||
      this.isErrorStreet
    ) {
      return true;
    }
    return false;
  }
  public onSubmitClicked(): void {
    this.stateService.registrationData = this.registrtionData;
    const observable = this.usersService.register(this.stateService.registrationData);
    observable.subscribe(()=>{
      this.router.navigate(["login"])
    },
    (serverErrorResponse: { message: string }) => {
      alert('error! ' + serverErrorResponse.message);
    })
  }

  ngOnInit(): void {}
}
