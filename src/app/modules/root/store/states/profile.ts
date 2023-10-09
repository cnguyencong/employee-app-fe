import { Injectable } from "@angular/core";
import { ProfileService } from "@core/services/apis/profile.service";
import { ProfileActionModel } from "@modules/root/types/models/store/action/profile";
import { ProfileStateModel } from "@modules/root/types/models/store/state/profile";
import { Action, State, StateContext } from "@ngxs/store";
import { tap } from 'rxjs/operators';
import { ProfileAction } from "../actions/profile";
import { STATE_TOKEN } from "../constants";

@State<ProfileStateModel>({
    name: 'profile',
    defaults: {
      profileDetail: {
        loading: false,
        data: {},
        error: null
      }
    }
  })
@Injectable()
export class ProfileState {
  constructor(private profileService: ProfileService) {}

  @Action(ProfileAction.FetchProfileDetail)
  fetProfileDetail({ patchState, getState, dispatch }: StateContext<ProfileStateModel>) {
    patchState({ profileDetail: { ...getState().profileDetail, loading: true } })
    return this.profileService.fetchProfileDetail().pipe(
      tap({
        next: (data) => { dispatch(new ProfileAction.FetchProfileDetail.Success(data)) },
        error: (error) => { dispatch(new ProfileAction.FetchProfileDetail.Failure(error)) }
      }),
    )
  }
  @Action(ProfileAction.FetchProfileDetail.Success)
  fetchProfileDetailSuccess(
    { patchState, getState }: StateContext<ProfileStateModel>,
    { profileDetailResponse }: ProfileActionModel
  ) {
    patchState({
      profileDetail: { ...getState().profileDetail, data: profileDetailResponse, loading: false }
    });
  }

  @Action(ProfileAction.FetchProfileDetail.Failure)
  fetchProfileDetailFailure(
    { patchState, getState }: StateContext<ProfileStateModel>,
    { error }: ProfileActionModel
  ) {
    patchState({
      profileDetail: { ...getState().profileDetail, error, loading: false }
    });
  }
}
