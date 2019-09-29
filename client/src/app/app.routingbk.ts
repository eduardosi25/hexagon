import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const APP_ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }

  /* { path: '**', pathMatch: 'full', redirectTo: '' }, */

];

/* export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES); */
 export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:true });
