import { Injectable } from "@angular/core";
import { TodoStateModel } from "@modules/root/types/models/store/state/todo";
import { State, Action, StateContext } from "@ngxs/store";
import { TodoAction } from "../actions/todo";
import { STATE_TOKEN } from "../constants";
import { TodoActionModel } from "@modules/root/types/models/store/action/todo";
import { produce } from "immer";
import { catchError, tap, mergeMap } from 'rxjs/operators';
import { TodoService } from "@core/services/apis/todo.service";
import { TodoAddResponse } from "@core/types/models/response/todo";
import { ServerError } from "@core/types/models/response/serverError";

@State<TodoStateModel>({
    name: STATE_TOKEN.TODO,
    defaults: {
      loading: false,
      todos: [] as any,
      todo: {} as any,
      error: null,
    }
  })
@Injectable()
export class TodoState {
  constructor(private todoService: TodoService) {}

  @Action(TodoAction.Add)
  todoAdd({ setState, patchState, dispatch }: StateContext<TodoStateModel>, { payload }: TodoAction.Add) {
    patchState({ loading: false })
    return this.todoService.addTodo(payload.todo).pipe(
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
    patchState({ loading: false , todo: payload as any })
  }
  @Action(TodoAction.Add.Failure)
  todoAddFailure({ patchState }: StateContext<TodoStateModel>, { payload }: TodoActionModel) {
    patchState({ loading: false , error: payload as any })
  }

  @Action(TodoAction.Edit)
  todoEdit({ setState }: StateContext<TodoStateModel>, { payload }: TodoActionModel) {
      setState(produce((draft) => {
        draft.todo = payload.todo;
      }));
  }
}
