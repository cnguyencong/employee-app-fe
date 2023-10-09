import { Component, PLATFORM_ID, Inject, OnInit } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Store } from '@ngxs/store';
import { map, delay, withLatestFrom } from 'rxjs/operators';
// import { TranslateService } from '@ngx-translate/core';
import { ConnectWebSocket } from '@ngxs/websocket-plugin'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map(v => v[1]),
  );

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private loader: LoadingBarService ,private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new ConnectWebSocket());
  }

}
