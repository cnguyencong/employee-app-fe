import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  @Input() isLoading = false;
  @Input() loadingType = 1 // from 1 to 40

}
