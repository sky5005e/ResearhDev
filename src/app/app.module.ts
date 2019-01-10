import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserService } from './services/user.service';
import { ApiService } from './services/api.service';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ExperienceModule } from './experience/experience.module';
import { FormApiService } from './services/formapi.service';
import { AuthGuard } from './services/auth-guard.service';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('106774232600-i2gkbg632s698jou6b70uolsepdu57ou.apps.googleusercontent.com')//google-client-id')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('384704044966469')
  }
]);

export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SignUpComponent,
    ThankYouComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ExperienceModule,
    SocialLoginModule.initialize(config)
  ],
  providers: [UserService, ApiService, FormApiService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
