import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { SendWebSocketMessage } from '@ngxs/websocket-plugin';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  newNovelForm = new FormGroup({
    novelName: new FormControl('')
  });

  constructor(private store: Store) {}

  ngOnInit() {}

  onSubmit(formData: FormGroup) {
    const { value: user, status } = formData;
    if (status === 'VALID') {
      // do something
    }
  }

  onReset() {
    this.store.dispatch(
      new UpdateFormValue({
        value: { novelName: '' },
        path: 'novels.newNovelForm',
      })
    );
  }

  goto404() {
    this.store.dispatch(new Navigate(['/404']))
  }

  sendMessage(from: string, message: string) {
    const event = new SendWebSocketMessage({
      type: 'message',
      from,
      message
    });

    this.store.dispatch(event);
  }
}
