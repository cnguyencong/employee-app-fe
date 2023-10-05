import { Selector } from "@ngxs/store";
import { STATE_TOKEN } from "../constants";
import { TodoStateModel } from "@modules/root/types/models/store/state/todo";

export class TodoSelectors {
    @Selector([STATE_TOKEN.TODO])
    static getTodos(state: TodoStateModel): any {
      return state.todos;
    }
  
    @Selector([STATE_TOKEN.TODO])
    static getTodo(state: TodoStateModel): any {
      return state.todo;
    }
  }