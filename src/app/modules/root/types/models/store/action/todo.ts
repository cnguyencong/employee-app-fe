import { Action } from "@core/types/store";

type Todo = {
    todo: any;
}

export interface TodoActionModel extends Action {
    payload: Todo;
}