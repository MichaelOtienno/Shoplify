import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './signup/signup.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SingleComponent } from './single/single.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path:'',redirectTo:'/landing',pathMatch:'full'},
 { path:'landing',component: LandingComponent},
 {path:'signin',component:SigninComponent},
 {path:'signup',component:SignupComponent},
 {path:'single',component:SingleComponent},
 {path:'checkout',component:CheckoutComponent},
 {path:'passwordReset',component:PasswordResetComponent},
 {path:'admin',component:AdminComponent},
 {path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
