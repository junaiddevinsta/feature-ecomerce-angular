import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RenderViewComponent } from './render-view/render-view.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    path:'',
    component:RenderViewComponent,
    children:[{
      path:'',
      component:ProductDetailsComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewProductRoutingModule { }
