import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UniversalStorage } from '@shared/storage/universal.storage';

@Injectable({
  providedIn: 'root'
})
export class DataSharingServiceService {
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public username: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public token: BehaviorSubject<string> = new BehaviorSubject<string>("");
  constructor(
    @Inject(UniversalStorage) private _appStorage: Storage,
  ) {    this.username.next(this._appStorage.getItem('authenticaterUser'));
    this.token.next(this._appStorage.getItem('token'));
    if (!!this.username.value && !!this.token.value) {
      this.isUserLoggedIn.next(true);
    } else {
      this.isUserLoggedIn.next(false);
    }
  }
}
