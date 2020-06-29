import { TodoDataService } from '@shared/services/rest/todo-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UniversalStorage } from '@shared/storage/universal.storage';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.scss']
})
export class ListTodosComponent implements OnInit {

  todos: Todo[]
  message: string
  username: string

  constructor(
    private todoService: TodoDataService,
    private router: Router,
    private _universalStorage: UniversalStorage  ) {

  }

  ngOnInit() {
    this.username = this._universalStorage.getItem('authenticaterUser')
    this.refreshTodos();
  }

  refreshTodos() {    this.todoService.retrieveAllTodos().subscribe(
      response => {
        this.todos = response;
      }
    )
  }

  deleteTodo(id) {
    this.todoService.deleteTodo(this.username, id).subscribe(
      response => {
        this.message = `Delete of Todo ${id} Successful!`;
        this.refreshTodos();
      }
    )
  }

  updateTodo(id) {
    this.router.navigate(['todos', id])  }

  addTodo() {
    this.router.navigate(['todos', -1])
  }
}
