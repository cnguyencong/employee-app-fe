import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { delay, map, withLatestFrom } from 'rxjs/operators';
// import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthAction } from '@modules/root/store/actions/auth';
import { ConnectWebSocket } from '@ngxs/websocket-plugin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map((v) => v[1])
  );

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private loader: LoadingBarService,
    private store: Store,
    private actions: Actions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new ConnectWebSocket());
    this.actions.pipe(ofActionSuccessful(AuthAction.LoginSuccess)).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
