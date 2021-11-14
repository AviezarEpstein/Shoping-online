import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/models/IOrder';
import { OrdersService } from 'src/app/services/orders.service';
import { StateService } from 'src/app/services/state.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreditCardValidators } from 'angular-cc-library';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { UsersService } from 'src/app/services/users-service.service';
import { observable } from 'rxjs';
import { RegistrationData } from 'src/app/models/RegitrationData';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
// import moment, { Moment } from 'moment';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {ErrorStateMatcher} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { MyErrorStateMatcher } from 'src/app/models/MyErrorStateMatcher';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class ShippingDetailsComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();

  


  constructor(
    public ordersServie: OrdersService,
    public stateService: StateService,
    public router: Router,
    private modalService: NgbModal,
    public htmlData: ElementRef,
    public usersService: UsersService,
  ) {}

  public orderDetails: IOrder = {
    cartId: this.stateService.cart.cartId,
    city: '',
    zip: '',
    address: '',
    email: '',
    ccNumber: '',
    ccExp: '',
    personalId: '',
    firstName: '',
    lastName: '',
    cvc: 0,
    price: this.stateService.cart.totalPrice,
    shippingDate: '',
  };

  public onDoubleClicked(): void {
    const observable = this.usersService.getAllUserDetails();
    observable.subscribe((res: RegistrationData) => {
      this.orderDetails.personalId = res.id;
      this.orderDetails.city = res.city;
      this.orderDetails.email = res.email;
      this.orderDetails.firstName = res.firstName;
      this.orderDetails.lastName = res.lastName;
      this.orderDetails.zip = res.zip;
      let idElement: any = document.getElementById('personalId');
      idElement.value = res.id;
      let cityElement: any = document.getElementById('city');
      cityElement.value = res.city;
      let emailElement: any = document.getElementById('email');
      emailElement.value = res.email;
      let firstNameElement: any = document.getElementById('firstName');
      firstNameElement.value = res.firstName;
      let lastNameElement: any = document.getElementById('lastName');
      lastNameElement.value = res.lastName;
      let zipElement: any = document.getElementById('zip');
      zipElement.value = res.zip;
    });
  }

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

  public validateEmail(email: string) {
    const regularExpression =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }

  public validateCardNumber(number: any) {
    var regex = new RegExp('^[0-9]{16}$');
    if (!regex.test(number)) return false;

    return this.luhnCheck(number);
  }

  public luhnCheck(val: any) {
    var sum = 0;
    for (var i = 0; i < val.length; i++) {
      var intVal = parseInt(val.substr(i, 1));
      if (i % 2 == 0) {
        intVal *= 2;
        if (intVal > 9) {
          intVal = 1 + (intVal % 10);
        }
      }
      sum += intVal;
    }
    return sum % 10 == 0;
  }

  public isErrorId: boolean = false;
  public errorId: string = '';

  public isErrorDate: boolean = false;
  public errorDate: string = '';

  public isErrorCcNumber: boolean = false;
  public errorCcNumber: string = '';

  public isErrorCcExp: boolean = false;
  public errorCcExp: string = '';

  public isErrorCvc: boolean = false;
  public errorCvc: string = '';

  public isErrorCity: boolean = false;
  public errorCity: string = '';

  public isErrorAddress: boolean = false;
  public errorAddress: string = '';

  public isErrorFirstName: boolean = false;
  public errorFirstName: string = '';

  public isErrorLastName: boolean = false;
  public errorLastName: string = '';

  public isErrorZip: boolean = false;
  public errorZip: string = '';

  public isErrorEmail: boolean = false;
  public errorEmail: string = '';

  public isError: boolean = false;
  public errorMessage: string = '';

  public onCityChanged(event: any): void {
    if (event.target.value == '') {
      this.isErrorCity = true;
      this.errorCity = 'City field is requiered!';
    } else if (event.target.value.length > 15) {
      this.isErrorCity = true;
      this.errorCity = 'Maximum charachters for this field is limited to 15';
    } else {
      this.isErrorCity = false;
      this.errorCity = '';
      this.orderDetails.city = event.target.value;
    }
  }

  public onDateChanged(event: any):void{    
    if (event.target.value == '') {
      this.isErrorDate = true;
      this.errorDate = 'Date field is requiered!';
    } else {
      this.isErrorDate = false;
      this.errorDate = '';
      this.orderDetails.shippingDate = event.target.value;
      console.log(this.orderDetails.shippingDate);
    }
  }

  public onCvcChanged(event: any): void {
    if (event.target.value == '') {
      this.isErrorCvc = true;
      this.errorCvc = 'Cvc field is requiered!';
    }else if(event.target.value.toString().length > 4 || event.target.value.toString().length < 3){
      this.isErrorCvc = true;
      this.errorCvc = 'cvc must be 3 or 4 digits'
    }else {
      this.isErrorCvc = false;
      this.errorCvc = '';
      this.orderDetails.cvc = event.target.value;
    }
  }

  public onZipChanged(event: any): void {
    if (event.target.value == '') {
      this.isErrorZip = true;
      this.errorZip = 'Zip field is requiered!';
    } else if (event.target.value.length > 6) {
      this.isErrorZip = true;
      this.errorZip = 'Maximum charachters for this field is limited to 6';
    } else {
      this.isErrorZip = false;
      this.errorZip = '';
      this.orderDetails.zip = event.target.value;
    }
  }

  public onAddressChanged(event: any): void {
    if (event.target.value == '') {
      this.isErrorAddress = true;
      this.errorAddress = 'Address field is requiered!';
    } else if (event.target.value.length > 45) {
      this.isErrorAddress = true;
      this.errorAddress = 'Maximum charachters for this field is limited to 45';
    } else {
      this.isErrorAddress = false;
      this.errorAddress = '';
      this.orderDetails.address = event.target.value;
    }
  }

  public onEmailChanged(event: any): void {
    if (!this.validateEmail(event.target.value)) {
      this.isErrorEmail = true;
      this.errorEmail = 'Email format is incorrect';
    } else {
      this.isErrorEmail = false;
      this.errorEmail = '';
      this.orderDetails.email = event.target.value;
    }
  }

  public onCcNumberChanged(event: any): void {    
    if (!this.validateCardNumber(this.getCcNumberFormat(event.target.value))) {
      this.isErrorCcNumber = true;
      this.errorCcNumber = 'Card number is invalid!';
    }else{
      this.isErrorCcNumber = false;
      this.errorCcNumber = '';
      this.orderDetails.ccNumber = this.getCcNumberFormat(event.target.value);
    }
  }

  public onPersonalIdChanged(event: any): void {
    if (!this.isValidIsraeliID(event.target.value)) {
      this.isErrorId = true;
      this.errorId = 'ID is invalid!';
      this.isError = true;
    } else {
      this.isErrorId = false;
      this.errorId = '';
      this.orderDetails.personalId = event.target.value;
      this.isError = false;
    }
  }

  public onCcExpChanged(event: any): void {
    if (event.target.value == '' || event.target.value == null) {
      this.isErrorCcExp = true;
      this.errorCcExp = 'cc Exp field is requiered!';
    } else {
      this.isErrorCcExp = false;
      this.errorCcExp = '';
      this.orderDetails.ccExp = event.target.value;
    }
  }

  public onLastNameChanged(event: any): void {
    if (event.target.value == '') {
      this.isErrorLastName = true;
      this.errorLastName = 'LastName field is requiered!';
    } else if (event.target.value.length > 15) {
      this.isErrorLastName = true;
      this.errorLastName =
        'Maximum charachters for this field is limited to 15';
    } else {
      this.isErrorLastName = false;
      this.errorLastName = '';
      this.orderDetails.lastName = event.target.value;
    }
  }

  public getCcNumberFormat(ccNumber: string): string{
    return ccNumber.replace(/\s/g, "");
  }

  public onFirstNameChanged(event: any): void {
    if (event.target.value == '') {
      this.isErrorFirstName = true;
      this.errorFirstName = 'First Name field is requiered!';
    } else if (event.target.value.length > 15) {
      this.isErrorFirstName = true;
      this.errorFirstName =
        'Maximum charachters for this field is limited to 15';
    } else {
      this.isErrorFirstName = false;
      this.errorFirstName = '';
      this.orderDetails.firstName = event.target.value;
    }
  }

  public isEmptyField(): boolean {
    if (
      this.orderDetails.city == '' ||
      this.orderDetails.address == '' ||
      this.orderDetails.firstName == '' ||
      this.orderDetails.lastName == '' ||
      this.orderDetails.shippingDate == '' ||
      this.isErrorLastName ||
      this.isErrorCity ||
      this.isErrorFirstName ||
      this.isErrorAddress || 
      this.isErrorDate ||
      this.isErrorZip ||
      this.isErrorEmail ||
      this.isErrorCcNumber ||
      this.isErrorAddress ||
      this.errorCvc ||
      this.isErrorCcExp
    ) {
      return true;
    }
    return false;
  }

  public content: string = '';
  public onPlaceOrderClicked() {
    const observable = this.ordersServie.addToCart(this.orderDetails);

    observable.subscribe(
      () => {
        this.open(this.content);
      },
      (serverErrorResponse: { message: string }) => {
        alert('error! ' + serverErrorResponse.message);
      }
    );
  }

  saveContent(content: any) {
    this.content = content;
  }

  closeResult = '';
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public onBackToShoppingClicked(): void {
    this.router.navigate(['/home']);
    this.modalService.dismissAll('Back to shopping');
    this.stateService.cart.products = [];
    this.stateService.cart.cartId = 0;
    this.stateService.cart.totalPrice = 0;
  }

  public openPDF(): void {
    let DATA = document.getElementById('htmlData') as HTMLElement;

    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

      PDF.save('angular-demo.pdf');
    });
  }
  public date = new Date();

  dateExp = new FormControl(_rollupMoment());

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.dateExp.value;
    ctrlValue.year(normalizedYear.year());
    this.dateExp.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.dateExp.value;
    ctrlValue.month(normalizedMonth.month());
    this.dateExp.setValue(ctrlValue);
    datepicker.close();
  }

  ngOnInit(): void {
    let dateElement: any = document.getElementById('shippingDate');
      this.orderDetails.shippingDate = dateElement.value;
  }
}
