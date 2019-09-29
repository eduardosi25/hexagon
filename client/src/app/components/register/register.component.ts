import { Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login-v2';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css'],
  providers: [ UserService ]
})


export class  RegisterComponent implements OnInit{
public title:string;
public user: User;
public status:string;
constructor(
  private _route: ActivatedRoute,
  private _router: Router,
  private _userService:UserService,
  private socialAuthService: AuthService

){
  this.title = "Únete";
  this.user = new User(
  "",
  "",
  "",
  "",
  "",
  "",
  "ROLE_USER",
  "");
}
  ngOnInit(){
  //  console.log("componente register cargado....");

  }
  onSubmit(form){
  //  console.log(this.user);
    this._userService.register(this.user).subscribe(
      response =>{
      if (response.user && response.user._id){
        //console.log("response User" + response.user);
        this.status= 'success';
        form.reset()
      }else{
        this.status= 'error';
      }
    },
    error =>{
      console.log(<any>error);
    }
  );

  }


  public socialSignIn(socialPlatform : string) {
      let socialPlatformProvider;
      if(socialPlatform == "facebook"){
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      }else if(socialPlatform == "google"){
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      }


      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          console.log(socialPlatform +" sign in data : " , userData);
          // Now sign-in with userData
          // ...

        }
      );
    }
}
