import { Component, Inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '@shared/services/rest/authentication.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public registered: string;
  public username: string;
  public email: string;
  public name: string;
  public password: string;
  public signUpUnsuccess: boolean = false;
  public signUpSuccess: boolean = false;
  public errorMessage: string = "Signup Unsuccessful"

  constructor(
    private router: Router,
    private AuthenticationService: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId: any,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  handleSignUp() {
    this.AuthenticationService.signUp(this.username, this.email, this.name, this.password)
      .subscribe(
        data => {
          this.signUpSuccess = true;
          this.signUpUnsuccess = false;
          this.registered = this.username;
          this.router.navigate(['/login/'], { queryParams: { registered: true }});
        },
        error => {
          console.log(error)
          this.signUpSuccess = false;
          this.signUpUnsuccess = true;
        }
      )
  }

}
