import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register-login/register/register.component';
import { LoginComponent } from './register-login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RenderWebsiteComponent } from './render-website.component';
import { HeaderComponent } from './shared-website/layout/header/header.component';
import { SharedWebsiteModule } from './shared-website/shared-website.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    RenderWebsiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedWebsiteModule,
    HomeModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
