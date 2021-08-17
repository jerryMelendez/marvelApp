import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-character',
  templateUrl: './panel-character.component.html',
  styleUrls: ['./panel-character.component.scss'],
})
export class PanelCharacterComponent implements OnInit {

  @Input() character: any;
  constructor() { }

  ngOnInit() {}

  

}
