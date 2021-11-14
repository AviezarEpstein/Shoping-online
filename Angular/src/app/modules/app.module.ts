import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';


import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../components/app/app.component';
import { HomeComponent } from '../components/home/home.component';
import { ProductComponent } from '../components/product/product.component';
import { ProductsContainerComponent } from '../components/products-container/products-container.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from '../components/cart/cart.component';
import { UsersService } from '../services/users-service.service';
import { AuthenticationInterceptor } from '../models/AuthenticationInterceptor';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { LoginComponent } from '../components/login/login.component';
import { ProductsService } from '../services/products.service';
import { RoutingModule } from './routing.module';
import { ProductsPipeByCategory } from '../pipes/ProductsPipeByCategory';
import { ProductsSubTextPipe } from '../pipes/ProductsSubTextPipe';
import { PlaceOrderContainerComponent } from '../components/place-order-container/place-order-container.component';
import { ShippingDetailsComponent } from '../components/shipping-details/shipping-details.component';
import { CartDetailsComponent } from '../components/cart-details/cart-details.component';
import { OrderDetailsPdfComponent } from '../components/order-details-pdf/order-details-pdf.component';
import { OrderDetailsHighlightComponent } from '../components/order-details-highlight/order-details-highlight.component';
import { EditProductDetailsComponent } from '../components/edit-product-details/edit-product-details.component';
import { AddProductComponent } from '../components/add-product/add-product.component';
import { RegistrationFirstPageComponent } from '../components/registration-first-page/registration-first-page.component';
import { RegistrationSecondPageComponent } from '../components/registration-second-page/registration-second-page.component';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    ProductsPipeByCategory,
    ProductsSubTextPipe,
    AppComponent,
    HomeComponent,
    ProductComponent,
    ProductsContainerComponent,
    CartComponent,
    NavbarComponent,
    LoginComponent,
    PlaceOrderContainerComponent,
    ShippingDetailsComponent,
    CartDetailsComponent,
    OrderDetailsPdfComponent,
    OrderDetailsHighlightComponent,
    EditProductDetailsComponent,
    AddProductComponent,
    RegistrationFirstPageComponent,
    RegistrationSecondPageComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    RoutingModule,
    NgbModule,
    CreditCardDirectivesModule,
    MaterialModule,
    FontAwesomeModule
  ],
  providers: [
    UsersService,
    ProductsService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(fasStar, farStar);
  }
 }
