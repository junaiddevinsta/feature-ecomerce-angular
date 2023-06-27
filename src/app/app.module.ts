import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register-login/register/register.component';
import { LoginComponent } from './register-login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RenderWebsiteComponent } from './render-website.component';
import { SharedWebsiteModule } from './shared-website/shared-website.module';
import { HomeModule } from './home/home.module';
import { ShopComponent } from './shop/shop.component';
import { productsQuery } from './state/products/products.query';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { WishlistPageComponent } from './wishlist-page/wishlist-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserAccountModule } from './user-account/user-account.module';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { IconMissingDirective } from './directives/icon-missing.directive';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    RenderWebsiteComponent,
    ShopComponent,
    SearchComponent,
    CartPageComponent,
    WishlistPageComponent,
    CheckoutComponent,
    OrderCompleteComponent,
    IconMissingDirective,
    AboutComponent,
    ContactComponent,



  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedWebsiteModule,
    HomeModule,
    UserAccountModule,


    ToastrModule.forRoot({
      timeOut:1000,
            progressBar:true,
            progressAnimation:'increasing',
            preventDuplicates:true

      }),




  ],

  providers: [productsQuery],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
