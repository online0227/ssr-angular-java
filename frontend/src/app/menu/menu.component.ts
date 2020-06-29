import { DataSharingServiceService } from '@shared/services/common/data-sharing-service.service';
import { Component, OnInit } from '@angular/core';
import { CLIENT_ADDRESS } from '../app.constants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isUserLoggedIn: boolean;
  username: string;
  client_address: string;

  constructor(
    private dataSharingService: DataSharingServiceService
  ) {    this.dataSharingService.isUserLoggedIn.subscribe(value => { 
      this.isUserLoggedIn = value;
    });    this.dataSharingService.username.subscribe(value => {
      this.username = value;
    });
  }

  ngOnInit() {
    this.client_address = CLIENT_ADDRESS;
  }

}
