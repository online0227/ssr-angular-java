import { HttpIntercepterBasicAuthService } from '@shared/services/http/http-intercepter-basic-auth.service';
import { DataSharingServiceService } from '@shared/services/common/data-sharing-service.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';import { CookieModule } from '@gorniv/ngx-universal';
import { UniversalStorage } from '@shared/storage/universal.storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';import { ListTodosComponent } from './list-todos/list-todos.component';
import { TodoComponent } from './todo/todo.component';
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    FooterComponent,
    MenuComponent,    ListTodosComponent,
    TodoComponent,
    LogoutComponent,
    ErrorComponent,
    IndexComponent,  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CookieModule.forRoot()
  ],
  providers: [
    DataSharingServiceService,
    UniversalStorage,
    {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
