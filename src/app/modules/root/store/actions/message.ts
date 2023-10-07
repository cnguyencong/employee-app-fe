import { ACTION_TYPE } from "../constants";

export class AddMessage {
  static type = ACTION_TYPE.CHAT_ADD_MESSAGE;
  constructor(public from: string, public message: string) {}
}
