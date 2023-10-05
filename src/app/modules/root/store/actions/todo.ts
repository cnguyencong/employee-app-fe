import { TodoAddResponse } from "@core/types/models/response/todo";
import { ACTION_TYPE } from "../constants";

export namespace TodoAction {
  export class Add {
    static readonly type = ACTION_TYPE.TODO_ADD_REQUEST;
    constructor(public payload: any) {}
    static Success = class {
      static readonly type = ACTION_TYPE.TODO_ADD_SUCCESS;
      constructor(public data: any) {}
    }
    static Failure = class {
      static readonly type = ACTION_TYPE.TODO_ADD_FAILURE;
      constructor(public error: any) {}
    }
  }
  
  export class Edit {
    static readonly type = ACTION_TYPE.TODO_EDIT;
    constructor(public payload: any) {}
  }

  export class FetchAll {
    static readonly type = ACTION_TYPE.TODO_FETCH_ALL;
  }

  export class Delete {
    static readonly type = ACTION_TYPE.TODO_DELETE;
    constructor(public id: number) {}
  }
}