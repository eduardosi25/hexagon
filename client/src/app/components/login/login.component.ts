import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login-v2';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})

export class LoginComponent implements OnInit {
  public title: string;
  public user: User;
  public status: string;
  public identity;
  public token;
  public display;
  public name;
  public email2;
  public image;
  public property: any;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private socialAuthService: AuthService,

  ) {

    this.title = "Iniciar Sesión ";

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


  ngOnInit() {
    //console.log("componente login cargado");
  }


  onSubmit() {
    //loguear al usuario y consigue sus datos
    this._userService.signup(this.user).subscribe(
      response => {
        this.identity = response.user;
        //console.log(this.identity)
        if (!this.identity || !this.identity._id) {
          this.status = 'Error';
        } else {

          //persistir datos de usuario
          localStorage.setItem('identity', JSON.stringify(this.identity));
          // Conseguir el token
          this.getToken();
          

        }
      }, error => {
        //console.log(errorMessage);
        var errorMessage = <any>error;
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );

  }
  getToken() {
    //loguear al usuario y consigue sus datos
    this._userService.signup(this.user, 'true').subscribe(
      response => {
        this.token = response.token;
        //console.log(this.token);
        if (this.token.length <= 0) {
          this.status = 'Error';
        } else {

          //persistir token del usuario
          localStorage.setItem('token', this.token);
          // Conseguir los contadores o estadisticas del usuario
          this.getCounters();

        }
      }, error => {
        //console.log(errorMessage);
        var errorMessage = <any>error;
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }


  getCounters() {
    this._userService.getCounters().subscribe(
      response => {
        localStorage.setItem('stats', JSON.stringify(response));
        this.status = 'success';
        this._router.navigate(['/home']);
        /*if(response.following.length <= 0){

        }*/
      },
      error => {
        console.log(<any>error);
      }
    )
  }


  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }


    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : ", userData);
        this.display = true;
        this.name = userData.name;
        this.email2 = userData.email;
        this.image = userData.image;
        this.token = userData.token;



        // Now sign-in with userData
        // ...

      }
    );
  }

}
