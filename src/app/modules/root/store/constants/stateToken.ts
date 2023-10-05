import { TodoStateModel } from "@modules/root/types/models/store/state/todo";
import { StateToken } from "@ngxs/store";

export const STATE_TOKEN = {
    TODO: new StateToken<TodoStateModel>('zoo'),
}