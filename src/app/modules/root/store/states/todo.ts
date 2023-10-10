import { Injectable } from "@angular/core";
import { TodoService } from "@core/services/apis/todo.service";
import { ServerError } from "@core/types/models/response/serverError";
import { TodoAddResponse } from "@core/types/models/response/todo";
import { TodoActionModel } from "@modules/root/types/models/store/action/todo";
import { TodoStateModel } from "@modules/root/types/models/store/state/todo";
import { Action, State, StateContext } from "@ngxs/store";
import { produce } from "immer";
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { TodoAction } from "../actions/todo";
import { STATE_TOKEN } from "../constants";

@State<TodoStateModel>({
    name: STATE_TOKEN.TODO,
    defaults: {
      loading: false,
      todos: { todo: [] },
      todo: { action: 'Nothing', timestamp: new Date() },
      error: null,
    }
  })
@Injectable()
export class TodoState {
  constructor(private todoService: TodoService) {}

  @Action(TodoAction.Add)
  todoAdd({ setState, patchState, dispatch }: StateContext<TodoStateModel>, { payload }: TodoActionModel) {
    patchState({ loading: false })
    return this.todoService.addTodo(payload).pipe(
      tap((data: TodoAddResponse) => {
        setState(produce((draft) => {
          draft.todo = data;
        }));
      }),
      mergeMap((data: TodoAddResponse) => dispatch(new TodoAction.Add.Success(data))),
      catchError((error: ServerError) => dispatch(new TodoAction.Add.Failure(error)))
    )
  }
  @Action(TodoAction.Add.Success)
  todoAddSuccess({ patchState }: StateContext<TodoStateModel>, { payload }: TodoActionModel) {
    patchState({ loading: false , todo: payload, })
  }
  @Action(TodoAction.Add.Failure)
  todoAddFailure({ patchState }: StateContext<TodoStateModel>, { error }: TodoActionModel) {
    patchState({ loading: false , error })
  }
}
