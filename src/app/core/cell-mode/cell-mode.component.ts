import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-cell-mode',
  templateUrl: './cell-mode.component.html',
  styleUrls: ['./cell-mode.component.scss'],
})
export class CellModeComponent implements OnInit {

  @Input() cells;
  responsiveOptions;
  constructor() {
   }

  ngOnInit() {
  }

}
