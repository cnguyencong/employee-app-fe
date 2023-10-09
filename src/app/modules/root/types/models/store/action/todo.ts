import { TodoAddRequest } from '@core/types/models/request/todo';
import { ServerError } from '@core/types/models/response/serverError';
import { TodoAddResponse } from '@core/types/models/response/todo';

export interface TodoActionModel {
  payload: TodoAddRequest;
  data: TodoAddResponse;
  error: ServerError
}
