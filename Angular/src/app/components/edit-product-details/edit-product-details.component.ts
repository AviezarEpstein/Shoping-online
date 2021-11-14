import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddProductData } from 'src/app/models/AddProductData';
import { IProduct } from 'src/app/models/IProduct';
import { ProductsService } from 'src/app/services/products.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-edit-product-details',
  templateUrl: './edit-product-details.component.html',
  styleUrls: ['./edit-product-details.component.css']
})
export class EditProductDetailsComponent implements OnInit {

  constructor(
    public stateService: StateService,
    public productsService: ProductsService,
    public router: Router
  ) {}

  public addProductData: AddProductData = {
    productName: '',
    catId: 0,
    price: 0,
    inStock: 0,
    image: '',
    description: '',
    brand: '',
    quantityPerUnit: 0,
    weight: 0,
    weightType: '',
  };

  public isErrorName: boolean = false;
  public errorName: string = '';

  public isErrorCatId: boolean = false;
  public errorCatId: string = '';

  public isErrorPrice: boolean = false;
  public errorPrice: string = '';

  public isErrorInStock: boolean = false;
  public errorInStock: string = '';

  public isErrorImage: boolean = false;
  public errorImage: string = '';

  public isErrorDescription: boolean = false;
  public errorDescription: string = '';

  public isErrorBrand: boolean = false;
  public errorBrand: string = '';

  public isErrorQuantityPerUnit: boolean = false;
  public errorQuantityPerUnit: string = '';

  public isErrorWeightType: boolean = false;
  public errorWeightType: string = '';

  public isErrorWeight: boolean = false;
  public errorWeight: string = '';

  public isError: boolean = false;
  public errorMessage: string = '';

  public onNameChanged(event: any): void {
    if (event.target.value == '') {
      this.isErrorName = true;
      this.errorName = "Name field is requiered!"
    }else if(event.target.value.length > 45){
      this.isErrorName = true;
      this.errorName = "Maximum charachters for this field is limited to 45"
    }else{
      this.isErrorName = false;
      this.errorName = '';
      this.addProductData.productName = event.target.value;
    }
  }

  public onCatIdChanged(event: any): void {
    if (event.target.value == null || event.target.value == ''
    || event.target.value == null || event.target.value == 0) {
      this.isErrorCatId = true;
      this.errorCatId = "Category id field is requiered!"
    }else if(event.target.value.length > 45){
      this.isErrorCatId = true;
      this.errorCatId = "Maximum charachters for this field is limited to 45"
    }else{
      this.isErrorCatId = false;
      this.errorCatId = '';
      this.addProductData.catId = +event.target.value;
    }
  }

  public onPriceChanged(event: any): void {
    if (event.target.value == null || event.target.value == ''
    || event.target.value == null || event.target.value == 0) {
      this.isErrorPrice = true;
      this.errorPrice = "Price field is requiered!"
    }else if(event.target.value.length > 45){
      this.isErrorPrice = true;
      this.errorPrice = "Maximum charachters for this field is limited to 45"
    }else{
      this.isErrorPrice = false;
      this.errorPrice = '';
      this.addProductData.price = +event.target.value;
    }
  }

  public onInStockChanged(event: any): void {
    if (event.target.value == null || event.target.value == ''
    || event.target.value == null || event.target.value == 0) {
      this.isErrorInStock = true;
      this.errorInStock = "InStock field is requiered!"
    }else if(event.target.value.length > 45){
      this.isErrorInStock = true;
      this.errorInStock = "Maximum charachters for this field is limited to 45"
    }else{
      this.isErrorInStock = false;
      this.errorInStock = '';
      this.addProductData.inStock = +event.target.value;
    }
  }

  public onImageChanged(event: any): void {
    if (event.target.value == '') {
      this.isErrorImage = true;
      this.errorImage = "Image field is requiered!"
    }else if(event.target.value.length > 450){
      this.isErrorImage = true;
      this.errorImage = "Maximum charachters for this field is limited to 45"
    }else{
      this.isErrorImage = false;
      this.errorImage = '';
      this.addProductData.image = event.target.value;
    }
  }

  public onDescriptionChanged(event: any): void {
    if (event.target.value == '') {
      this.isErrorDescription = true;
      this.errorDescription = "Description field is requiered!"
    }else if(event.target.value.length > 250){
      this.isErrorDescription = true;
      this.errorDescription = "Maximum charachters for this field is limited to 45"
    }else{
      this.isErrorDescription = false;
      this.errorDescription = '';
      this.addProductData.description = event.target.value;
    }
  }

  public onBrandChanged(event: any): void {
    if (event.target.value == '') {
      this.isErrorBrand = true;
      this.errorBrand = "Brand field is requiered!"
    }else if(event.target.value.length > 45){
      this.isErrorBrand = true;
      this.errorBrand = "Maximum charachters for this field is limited to 45"
    }else{
      this.isErrorBrand = false;
      this.errorBrand = '';
      this.addProductData.brand = event.target.value;
    }
  }

  public onQuantityPerUnitChanged(event: any): void {
    if (event.target.value == null || event.target.value == ''
    || event.target.value == null || event.target.value == 0) {
      this.isErrorQuantityPerUnit = true;
      this.errorQuantityPerUnit = "QuantityPerUnit field is requiered!"
    }else if(event.target.value.length > 45){
      this.isErrorQuantityPerUnit = true;
      this.errorQuantityPerUnit = "Maximum charachters for this field is limited to 45"
    }else{
      this.isErrorQuantityPerUnit = false;
      this.errorQuantityPerUnit = '';
      this.addProductData.quantityPerUnit = +event.target.value;
    }
  }

  public onWeightTypeChanged(event: any): void {
    if (event.target.value == '') {
      this.isErrorWeightType = true;
      this.errorWeightType = "WeightType field is requiered!"
    }else if(event.target.value.length > 45){
      this.isErrorWeightType = true;
      this.errorWeightType = "Maximum charachters for this field is limited to 45"
    }else{
      this.isErrorWeightType = false;
      this.errorWeightType = '';
      this.addProductData.weightType = event.target.value;
    }
  }

  public onWeightChanged(event: any): void {
    if (event.target.value == null || event.target.value == ''
    || event.target.value == null || event.target.value == 0) {
      this.isErrorWeight = true;
      this.errorWeight = "Weight field is requiered!"
    }else if(event.target.value.length > 45){
      this.isErrorWeight = true;
      this.errorWeight = "Maximum charachters for this field is limited to 45"
    }else{
      this.isErrorWeight = false;
      this.errorWeight = '';
      this.addProductData.weight = +event.target.value;
    }
  }

  public isEmptyField(): boolean {
    if (
      this.addProductData.brand == '' ||
      this.addProductData.description == '' ||
      this.addProductData.image == '' ||
      this.addProductData.productName == '' ||
      this.addProductData.weightType == '' ||
      this.addProductData.catId == 0 ||
      this.addProductData.inStock == 0 ||
      this.addProductData.price == 0 ||
      this.addProductData.quantityPerUnit == 0 ||
      this.addProductData.weight == 0 ||
      this.isErrorBrand ||
      this.isErrorCatId ||
      this.isErrorDescription ||
      this.isErrorImage ||
      this.isErrorInStock ||
      this.isErrorName ||
      this.isErrorPrice ||
      this.isErrorQuantityPerUnit ||
      this.isErrorWeight ||
      this.isErrorWeightType
    ) {
      return true;
    }
    return false;
  }

  public onAddProductClicked(): void {
    const observable = this.productsService.editProduct(this.addProductData, this.stateService.currentEditedProductId);
    observable.subscribe(
      () => {
        this.router.navigate(['home']);
      },
      (serverErrorResponse: { message: string }) => {
        alert('error! ' + serverErrorResponse.message);
      }
    );
  }

  ngOnInit(): void {
    this.addProductData = this.stateService.currentEditedProductDetails;
  }

}
