import { TodoAddResponse } from "@core/types/models/response/todo";
import { ACTION_TYPE } from "../constants";
import { ServerError } from "@core/types/models/response/serverError";
import { TodoActionModel } from "@modules/root/types/models/store/action/todo";

export namespace TodoAction {
  export class Add {
    static readonly type = ACTION_TYPE.TODO_ADD_REQUEST;
    constructor(public payload: TodoActionModel['payload']) {}
    static Success = class {
      static readonly type = ACTION_TYPE.TODO_ADD_SUCCESS;
      constructor(public data: TodoActionModel['data']) {}
    }
    static Failure = class {
      static readonly type = ACTION_TYPE.TODO_ADD_FAILURE;
      constructor(public error: ServerError) {}
    }
  }

  export class Edit {
    static readonly type = ACTION_TYPE.TODO_EDIT;
    constructor(public payload: TodoActionModel['payload']) {}
  }

  export class FetchAll {
    static readonly type = ACTION_TYPE.TODO_FETCH_ALL;
  }

  export class Delete {
    static readonly type = ACTION_TYPE.TODO_DELETE;
    constructor(public id: number) {}
  }
}
