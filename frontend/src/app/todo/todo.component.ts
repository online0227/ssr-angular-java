import { ActivatedRoute, Router } from '@angular/router';
import { TodoDataService } from '@shared/services/rest/todo-data.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../list-todos/list-todos.component';
import { UniversalStorage } from '@shared/storage/universal.storage';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  id:number
  todo: Todo
  private username: string

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router,
    private _universalStorage: UniversalStorage
  ) { }

  ngOnInit() {
    
    this.id = this.route.snapshot.params['id'];
    
    this.todo = new Todo(this.id,'',false,new Date());

    this.username = this._universalStorage.getItem('authenticaterUser')
    
    if(this.id!=-1) {
      this.todoService.retrieveTodo(this.username, this.id)
          .subscribe (
            data => this.todo = data
          )
    }
  }

  saveTodo() {
    if(this.id == -1) {      this.todoService.createTodo(this.username, this.todo)
          .subscribe (
            data => {              this.router.navigate(['todos'])
            }
          )
    } else {
      this.todoService.updateTodo(this.username, this.id, this.todo)
          .subscribe (
            data => {              this.router.navigate(['todos'])
            }
          )
    }
  }

}
