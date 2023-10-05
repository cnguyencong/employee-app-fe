import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

@State({
  name: 'novels',
  defaults: {
    newNovelForm: {
      model: {},
      dirty: false,
      status: '',
      errors: {}
    }
  }
})
@Injectable()
export class NovelsState {}
