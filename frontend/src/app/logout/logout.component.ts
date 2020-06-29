import { DataSharingServiceService } from '@shared/services/common/data-sharing-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UniversalStorage } from '@shared/storage/universal.storage';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private dataSharingService: DataSharingServiceService,
    private _universalStorage: UniversalStorage  ) { }

  ngOnInit() {    this._universalStorage.removeItem('authenticaterUser');
    this._universalStorage.removeItem('token');
    this.dataSharingService.isUserLoggedIn.next(false);
    this.router.navigate(['/']);
  }

}
