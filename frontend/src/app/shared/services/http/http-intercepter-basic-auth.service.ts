import { DataSharingServiceService } from '@shared/services/common/data-sharing-service.service';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { SSL, DOMAIN } from "../../../app.constants"

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {
  constructor(
    private dataSharingService: DataSharingServiceService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let authHeaderString = this.dataSharingService.token.value;
    let username = this.dataSharingService.username.value;

    let path = (SSL ? "https://" : "http://") + (username ? `${username}.` : "www.") + DOMAIN + request.url;

    if (authHeaderString && username) {
      request = request.clone({
        url: path,
        setHeaders: {
          Authorization: authHeaderString,
        }
      })

    } else {
      request = request.clone({
        url: path,
      })
    }
    return next.handle(request);
  }


}
