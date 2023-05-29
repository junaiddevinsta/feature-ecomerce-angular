import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RenderWebsiteComponent } from '../render-website.component';
import { RenderHomeComponent } from './render-home.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [

    {
            path:'',
            component:RenderHomeComponent,
            children:[
              {
                path:'',
                component:CategoriesComponent
              }
            ]
          }

  // {
  //   path:'',
  //   component:RenderWebsiteComponent,
  //   children:[
  //     {
  //       path:'',
  //       component:RenderHomeComponent
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
