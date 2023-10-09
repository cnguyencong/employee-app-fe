import { LoginResponse } from '@core/types/models/response/auth';
import { ServerError } from '@core/types/models/response/serverError'

export interface AuthStateModel {
  accessToken: LoginResponse['accessToken'];
  userLoggedIn: LoginResponse | Record<string, never>;
  login: {
    loading: boolean;
    error: ServerError | null;
    form: {
      model: { email: string, password: string }
      dirty: boolean;
      status: string;
      errors: unknown;
    }
  }
}
