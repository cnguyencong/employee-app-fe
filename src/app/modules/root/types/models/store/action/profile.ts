import { ProfileDetailResponse } from "@core/types/models/response/profile";
import { ServerError } from "@core/types/models/response/serverError";
import { Action } from "@core/types/store";

export interface ProfileActionModel extends Action {
  profileDetailResponse: ProfileDetailResponse;
  error: ServerError
}
