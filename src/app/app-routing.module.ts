import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

const routes: Routes = [
  { path: '' , component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signUp', component: SignUpComponent},
  { path: 'thankYou', component: ThankYouComponent},
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},  
  { path: 'experience', loadChildren: './experience/experience.module#ExperienceModule'},
  
  { path: 'checkout', loadChildren: './checkout/checkout.module#CheckOutModule'},  
  { path: 'user', loadChildren: './userprofile/userprofile.module#UserProfileModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
