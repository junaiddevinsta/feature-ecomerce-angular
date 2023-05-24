import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RenderWebsiteComponent } from '../render-website.component';
import { RenderHomeComponent } from './render-home.component';

const routes: Routes = [

    {
            path:'',
            component:RenderHomeComponent
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
