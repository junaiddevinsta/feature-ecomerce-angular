import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register-login/register/register.component';
import { LoginComponent } from './register-login/login/login.component';

const routes: Routes = [{
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
