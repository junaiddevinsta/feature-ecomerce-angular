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





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    RenderWebsiteComponent,
    ShopComponent,
    SearchComponent,


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
