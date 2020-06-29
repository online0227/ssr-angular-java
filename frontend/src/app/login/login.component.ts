import { AuthenticationService } from '@shared/services/rest/authentication.service';
import { DataSharingServiceService } from '@shared/services/common/data-sharing-service.service';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usernameOrEmail = ''
  password = ''
  errorMessage = 'Invalid Credentials'
  invalidLogin = false
  signUpSuccess = false;

  constructor(
    private router: Router,
    private AuthenticationService: AuthenticationService,
    private dataSharingService: DataSharingServiceService,
    @Inject(PLATFORM_ID) private platformId: any,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      let registered = params['registered'];
      if (registered === "true") {
        this.signUpSuccess = true;
      }
    });
  }

  handleJWTAuthLogin() {
    this.AuthenticationService.executeJWTAuthenticationService(this.usernameOrEmail, this.password)
      .subscribe(
        data => {
          this.invalidLogin = false
          this.dataSharingService.isUserLoggedIn.next(true);
          this.dataSharingService.username.next(data.username);
          this.dataSharingService.token.next(data.token);
          this.router.navigate([`welcome/${data.username}`]);        },
        error => {
          console.log(error)
          this.invalidLogin = true;
          this.signUpSuccess = false;
          this.dataSharingService.isUserLoggedIn.next(false);
        }
      )
  }

}
