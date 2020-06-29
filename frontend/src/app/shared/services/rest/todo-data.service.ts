import { SERVER_ADDRESS } from '../../../app.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Todo } from '../../../list-todos/list-todos.component';
import { UniversalStorage } from '@shared/storage/universal.storage';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
  private token: any;

  constructor(
    private http: HttpClient,
    @Inject(UniversalStorage) private _appStorage: Storage,
  ) { 
    this.token = this._appStorage.getItem('token');
  }

  retrieveAllTodos() {    return this.http.get<Todo[]>(`/jpa/users/todos`);  }
  deleteTodo(usernameOrEmail, id) {
    return this.http.delete(`/jpa/users/${usernameOrEmail}/todos/${id}`);
  }

  retrieveTodo(usernameOrEmail, id) {    return this.http.get<Todo>(`/jpa/users/${usernameOrEmail}/todos/${id}`);
  }

  updateTodo(usernameOrEmail, id, todo) {
    return this.http.put(
      `/jpa/users/${usernameOrEmail}/todos/${id}`
      , todo);
  }

  createTodo(usernameOrEmail, todo) {
    return this.http.post(
      `/jpa/users/${usernameOrEmail}/todos`
      , todo);
  }

}
