import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { AdminGuard } from '../models/admin.guard';
import { PlaceOrderContainerComponent } from '../components/place-order-container/place-order-container.component';
import { ShippingDetailsComponent } from '../components/shipping-details/shipping-details.component';
import { EditProductDetailsComponent } from '../components/edit-product-details/edit-product-details.component';
import { AddProductComponent } from '../components/add-product/add-product.component';
import { RegistrationFirstPageComponent } from '../components/registration-first-page/registration-first-page.component';
import { RegistrationSecondPageComponent } from '../components/registration-second-page/registration-second-page.component';

const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "home", component: HomeComponent },
    { path: "admin", canActivate: [AdminGuard], component: HomeComponent},     
    {path: "home", component: HomeComponent},   
    {path: "editProduct", component: EditProductDetailsComponent},
    {path: "addProduct", component: AddProductComponent},
    { path: "customer", component: HomeComponent}, 
    {path: "home", component: HomeComponent},
    { path: "payment", component: PlaceOrderContainerComponent },
    { path: "registration", component: RegistrationFirstPageComponent },
    {path: "setAddress", component: RegistrationSecondPageComponent},
    { path: "", redirectTo: "home", pathMatch: "full" },
    // { path: "**", component: Page404Component } // Page not Found (Must be the last one!!!)
];

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forRoot(routes) // Importing the above routes
  ]
  })
export class RoutingModule {

 }
