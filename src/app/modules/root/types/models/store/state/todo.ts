import { ServerError } from "@core/types/models/response/serverError";
import { TodoFetchAllResponse, TodoResponse } from "@core/types/models/response/todo";

export interface TodoStateModel {
    loading: boolean;
    todos: TodoFetchAllResponse;
    todo: TodoResponse;
    error: ServerError | null;
}
