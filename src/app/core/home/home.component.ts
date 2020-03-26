import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  plan: object = { isCellMode: true, buildings:[{name:"BAT 1", cells: [{name:"cell 1"},
  {name:"cell 2"},{name:"cell 3"},{name:"cell 4"},{name:"cell 5"},{name:"cell 6"},{name:"cell 7"},{name:"cell 8"},{name:"cell 9"}],
  underground: [{pos: -1, area: 100},
    {pos: -2, area: 100},
    {pos: -3, area: 100},
    {pos: -4, area: 100}],
  floors: [{pos: 0, area: 100},
    {pos: 1, area: 100},
    {pos: 2, area: 100},
    {pos: 3, area: 100},
    {pos: 4, area: 100}]},
   {name: "BAT2"},
   {name: "BAT 3"}] };
  constructor() { }

  ngOnInit() {
  }

}
