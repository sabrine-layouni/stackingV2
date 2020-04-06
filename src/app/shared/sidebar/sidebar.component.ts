import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() kinds;
  @Input() occupants;
  @Input() owners;
  @Input() offers;
  index: number = -1;
  constructor() { }

  ngOnInit() {
  }

  onTabClose(event) {
    this.index = event.index;
    console.log(event.index);
}

  onTabOpen(event) {
    this.index = event.index;
    console.log(event.index);
  }

}
