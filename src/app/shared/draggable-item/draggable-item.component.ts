import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-draggable-item',
  templateUrl: './draggable-item.component.html',
  styleUrls: ['./draggable-item.component.scss']
})
export class DraggableItemComponent implements OnInit {

  @Input() item;
  constructor() { }

  ngOnInit() {
  }

}
