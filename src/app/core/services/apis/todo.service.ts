import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import {
  TodoAddRequest,
  TodoEditRequest,
} from '@core/types/models/request/todo';
import {
  TodoFetchAllResponse,
  TodoAddResponse,
  TodoEditResponse
} from '@core/types/models/response/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService extends BaseService {
  addTodo(request: TodoAddRequest) {
    return this.postData<TodoAddResponse, TodoAddRequest>(
      `todo`,
      request
    );
  }

  editTodo(id: string, request: TodoEditRequest) {
    return this.putData<TodoEditResponse, TodoEditRequest>(
        `todo/${id}`,
        request
      );
  }

  fetchAllTodo() {
    return this.getData<TodoFetchAllResponse>(`todo`);
  }

  deleteTodo(id: string) {
    return this.delete(`todo/${id}`);
  }
}
