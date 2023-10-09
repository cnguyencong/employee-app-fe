import { LoginRequest } from "@core/types/models/request/auth";
import { LoginResponse } from "@core/types/models/response/auth";
import { ACTION_TYPE } from "../constants";
import { ServerError } from "@core/types/models/response/serverError";

export namespace AuthAction {
  export class LoginRequest {
    static readonly type = ACTION_TYPE.AUTH_LOGIN_REQUEST;
  }

  export class LoginSuccess {
    static readonly type = ACTION_TYPE.AUTH_LOGIN_SUCCESS;
    constructor(public data: LoginResponse) {}
  }

  export class LoginFailure {
    static readonly type = ACTION_TYPE.AUTH_LOGIN_FAILURE;
    constructor(public error: ServerError) {}
  }
}
