import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DataSharingServiceService } from '@shared/services/common/data-sharing-service.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(
    private router: Router,
    private dataSharingService: DataSharingServiceService
    ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.dataSharingService.isUserLoggedIn.value)
      return true;

    this.router.navigate(['login']);

    return false;
  }
}
