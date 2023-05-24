import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register-login/register/register.component';
import { LoginComponent } from './register-login/login/login.component';
import { RenderWebsiteComponent } from './render-website.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {
    path:'',
    component:RenderWebsiteComponent,
    children:[
      {
        path:'register',
        component:RegisterComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'',
       loadChildren:()=> import('./home/home.module').then((m)=>m.HomeModule)
      },
      {
        path:'shop',
        component:ShopComponent
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
