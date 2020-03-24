import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

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