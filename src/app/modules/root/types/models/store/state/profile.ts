import { ServerError } from '@core/types/models/response/serverError'

interface ProfileDetailStateModel {
  // TODO: Implement
  loading: boolean;
  data: object;
  error: ServerError | null;
}

export interface ProfileStateModel {
  profileDetail: ProfileDetailStateModel
}
