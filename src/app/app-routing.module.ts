import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register-login/register/register.component';
import { LoginComponent } from './register-login/login/login.component';
import { RenderWebsiteComponent } from './render-website.component';
import { ShopComponent } from './shop/shop.component';
import { SearchComponent } from './search/search.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { WishlistPageComponent } from './wishlist-page/wishlist-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';

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
      },
      {
        path:'view-product/:id',
        loadChildren:()=>import('./view-product/view-product.module').then((m)=>m.ViewProductModule)
      },
      {
        path:'cart',
        component:CartPageComponent
      },
      {
        path:'wishlist',
        component:WishlistPageComponent
      },
      {
        path:'checkout',
        component:CheckoutComponent
      },
      {
        path:'user-account',
        loadChildren:()=>import('./user-account/user-account.module').then((m)=>m.UserAccountModule)
      },
      {
        path:'order-complete',
        component:OrderCompleteComponent
      }

    ]
  },
  {
    path:'search',
    component:SearchComponent
  },
  {
    path:'search/:query',
    component:SearchComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
