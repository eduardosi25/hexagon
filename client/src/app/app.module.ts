import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
//import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataTablesModule } from 'angular-datatables';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UsersComponent } from './components/users/users.component';

import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider
} from "angular-6-social-login-v2";
import { DataTablesComponent } from './components/datatables/datatables.component';



// Configs
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
	      provider: new FacebookLoginProvider("897092273830007")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
	      provider: new GoogleLoginProvider("71979544860-fq9t5lqid1oc7b9mrt6p1l0ijvt5h9u9.apps.googleusercontent.com")
        },

      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CalendarComponent,
    UserEditComponent,
    SidebarComponent,
    UsersComponent,
    DataTablesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    SocialLoginModule,
    DataTablesModule


  ],
  providers: [
    AppRoutingModule,{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
