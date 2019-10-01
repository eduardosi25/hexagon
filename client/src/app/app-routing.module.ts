import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UsersComponent } from './components/users/users.component';
import { DataTablesComponent } from './components/datatables/datatables.component';

const APP_ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'table', component: DataTablesComponent },
  { path: 'mis-datos', component: UserEditComponent },
  { path: 'usuarios/:page', component: UsersComponent },
  { path: 'usuarios', component: UsersComponent },
  { path: '**', component: HomeComponent }

  /*{ path: 'sidebar', component: SidebarComponent },*/
  /* { path: '**', pathMatch: 'full', redirectTo: '' }, */

];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

 export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES); 
// export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:true });
