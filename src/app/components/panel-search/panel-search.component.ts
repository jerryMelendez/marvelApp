import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-panel-search',
  templateUrl: './panel-search.component.html',
  styleUrls: ['./panel-search.component.scss'],
})
export class PanelSearchComponent implements OnInit {

  @Output() typeChanged = new EventEmitter<string>();
  type='got';
  @Input() categoryName: string = '';
  constructor() { }

  ngOnInit() {}

  onSearchChange(event)
  {
    console.log(event.detail.value);
    this.typeChanged.emit(event.detail.value);
  }

}
