import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class HelloWorldBean {
  constructor(public message: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http: HttpClient
  ) { }
  executeHelloWorldServiceWithPathVariable(name) {
    return this.http.get<HelloWorldBean>(
      `/hello-world/path-variable/${name}`,    );  }}
