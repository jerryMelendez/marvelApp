import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-panel-search',
  templateUrl: './panel-search.component.html',
  styleUrls: ['./panel-search.component.scss'],
})
export class PanelSearchComponent implements OnInit {

  @Output() typeChanged = new EventEmitter<string>();
  @Input() categoryName: string = '';
  constructor() { }

  ngOnInit() {}

  onSearchChange(event)
  {
    this.typeChanged.emit(event.detail.value);
  }
}
