import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { RenderHomeComponent } from './render-home.component';
import { CategoriesComponent } from './categories/categories.component';


@NgModule({
  declarations: [
    RenderHomeComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
