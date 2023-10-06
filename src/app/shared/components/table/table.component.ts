import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() tableName: string;

  // Table props
  @Input() rows : any;
  @Input() loadingIndicator : any;
  @Input() columns : any;
  @Input() columnMode : any;
  @Input() headerHeight? : any;
  @Input() footerHeight? : any;
  @Input() rowHeight? : any;
  @Input() limit? : number; // paging

  // Other
  @Input() filtering : {
    show : boolean,
    placeholder : string
  };

  @Output() onFiltering = new EventEmitter<string>();

}
