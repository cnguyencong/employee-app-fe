import { ProfileDetailResponse } from "@core/types/models/response/profile";
import { ACTION_TYPE } from "../constants";
import { ServerError } from "@core/types/models/response/serverError";

export namespace ProfileAction {
  export class FetchProfileDetail {
    static readonly type = ACTION_TYPE.PROFILE_FETCH_PROFILE_DETAIL_REQUEST;
    static Success = class {
      static readonly type = ACTION_TYPE.PROFILE_FETCH_PROFILE_DETAIL_SUCCESS;
      constructor(public data: ProfileDetailResponse) {}
    }
    static Failure = class {
      static readonly type = ACTION_TYPE.PROFILE_FETCH_PROFILE_DETAIL_FAILURE;
      constructor(public error: ServerError) {}
    }
  }
}
