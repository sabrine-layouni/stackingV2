import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  plan: object = { isCellMode: false, buildings:[{name:"BAT 1"}, {name: "BAT2"}, {name: "BAT 3"}] };
  constructor() { }

  ngOnInit() {
  }

}
