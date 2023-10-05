import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AddMessage } from '../actions/message';

export interface Message {
  from: string;
  message: string;
}

@State<Message[]>({
  name: 'messages',
  defaults: [],
})
@Injectable()
export class MessagesState {
  @Action(AddMessage)
  addMessage(ctx: StateContext<Message[]>, { from, message }: AddMessage) {
    const state = ctx.getState();
    // omit `type` property that server socket sends
    ctx.setState([...state, { from, message }]);
  }
}
