import { Injectable } from '@angular/core';
import { AuthService } from '@core/services/apis/auth.service';
import { AuthStateModel } from '@modules/root/types/models/store/state/auth';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { AuthAction } from '../actions/auth';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    accessToken: '',
    userLoggedIn: {},
    login: {
      loading: false,
      error: null,
      form: {
        model: { email: '', password: '' },
        dirty: false,
        status: '',
        errors: {},
      },
    },
  },
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService) {}

  @Selector()
  static isLoggedIn(state: AuthStateModel) {
    return Boolean(state.accessToken);
  }

  // Login
  @Action(AuthAction.LoginRequest)
  loginRequest(
    { patchState, dispatch, getState }: StateContext<AuthStateModel>
  ) {
    const request = getState().login.form.model

    patchState({ login: { ...getState().login, loading: true } });
    return this.authService.login(request).pipe(
      tap({
        next: (loginResponse) => {
          dispatch(new AuthAction.LoginSuccess(loginResponse));
        },
        error: (error) => {
          dispatch(new AuthAction.LoginFailure(error));
        },
      })
    );
  }
  @Action(AuthAction.LoginSuccess)
  loginSuccess(
    { patchState, getState }: StateContext<AuthStateModel>,
    { data }: AuthAction.LoginSuccess
  ) {
    patchState({
      login: { ...getState().login, loading: false },
      userLoggedIn: data,
    });
  }
  @Action(AuthAction.LoginFailure)
  loginFailure(
    { patchState, getState }: StateContext<AuthStateModel>,
    { error }: AuthAction.LoginFailure
  ) {
    patchState({ login: { ...getState().login, error } });
  }
}
