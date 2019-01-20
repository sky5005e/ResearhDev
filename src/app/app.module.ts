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
import { CheckOutModule } from './checkout/checkout.module';
import { UserProfileModule } from './userprofile/userprofile.module';

let configHindustanDomain = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('1077617571524-sjf1b7hramalpp9fus0nie6fe9mffjir.apps.googleusercontent.com')
    //provider:  new GoogleLoginProvider('20117584457-htj1bubaa1jsk8a855q3h3on85j9gqih.apps.googleusercontent.com')//google-client-id')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('384704044966469')
  }
]);
let configAzureDomain = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('510888144384-rtctpm39st8djgkucg92aet0217lqcdo.apps.googleusercontent.com')
    //google-client-id')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('331600844113566')
  }
]);
//510888144384-rtctpm39st8djgkucg92aet0217lqcdo.apps.googleusercontent.com
let configlocalHost = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('20117584457-htj1bubaa1jsk8a855q3h3on85j9gqih.apps.googleusercontent.com')//google-client-id')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('384704044966469')
  }
]);
let configIP = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('20117584457-htj1bubaa1jsk8a855q3h3on85j9gqih.apps.googleusercontent.com')//google-client-id')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('384704044966469')
  }
]);
//provider: //new GoogleLoginProvider('20117584457-htj1bubaa1jsk8a855q3h3on85j9gqih.apps.googleusercontent.com')//google-client-id')

export function provideConfig() {


  if (window.location.href.indexOf('http://hindustanfundscarrier.com') !== -1) {
    return configHindustanDomain;
  }
  if (window.location.href.indexOf('https://bukkzydemo.azurewebsites.net/') !== -1) {
    return configAzureDomain;
  }
  else {
    return configlocalHost;
  }
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
    CheckOutModule,
    UserProfileModule,
    SocialLoginModule//.initialize(config)
  ],
  providers: [UserService, ApiService, FormApiService, AuthGuard,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
