import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  plan: object = { isCellMode: false,name:"BAT 1", buildings:[
  {tf_name:"BAT 1", tf_buildingid:"rezge1g524ez35g",
  undergrounds: [
    {tf_level: -1, tf_surface: 100, tf_floorid:"5412f4e5z"},
    {tf_level: -2, tf_surface: 100},
    {tf_level: -3, tf_surface: 100},
    {tf_level: -4, tf_surface: 100}
  ],
  floors: [
    {tf_level: 0, tf_surface: 100},
    {tf_level: 1, tf_surface: 100},
    {tf_level: 2, tf_surface: 100},
    {tf_level: 3, tf_surface: 100},
    {tf_level: 4, tf_surface: 100}
  ],
  tf_natures:[
    {tf_name:"Services (Bureaux)", tf_color:"#9eaede"},
    {tf_name:"Habitaion", tf_color:"#9eaede"},
    {tf_name:"RIE", tf_color:"#9eaede"},
    {tf_name:"Bureaux", tf_color:"#9eaede"},
    {tf_name:"Laboratoires", tf_color:"#9eaede"},
    {tf_name:"Logistique", tf_color:"#9eaede"},
  ],
  tf_occupancies: [
    {tf_name: "fsfsqfqs", tf_color:"303531", tf_occupancyid:"9ere321e5r4er1e2r1e2"},
    {tf_name: "fsfsqfqs", tf_color:"303531", tf_occupancyid:"9ere321e5r4er1e2r1e2"},
    {tf_name: "fsfsqfqs", tf_color:"303531", tf_occupancyid:"9ere321e5r4er1e2r1e2"},
    {tf_name: "fsfsqfqs", tf_color:"303531", tf_occupancyid:"9ere321e5r4er1e2r1e2"},
    {tf_name: "fsfsqfqs", tf_color:"303531", tf_occupancyid:"9ere321e5r4er1e2r1e2"},
  ],
  tf_properties: [],
  tf_cells:[],
  tf_parkings:[{type:"car", count:10, img:""},
  {type:"truck", count:20, img:""},
  {type:"moto", count:30, img:""},
  {type:"bike", count:40, img:""}],
  
  tf_offers:[

  ]},
    {tf_name:"BAT 2", tf_buildingid:"rezge1g524ez35g"},
    {tf_name:"BAT 3", tf_buildingid:"rezge1g524ez35g"},
    {tf_name:"BAT 4", tf_buildingid:"rezge1g524ez35g"},
    {tf_name:"BAT 5", tf_buildingid:"rezge1g524ez35g"},
    {tf_name:"BAT 6", tf_buildingid:"rezge1g524ez35g"},
    {tf_name:"BAT 7", tf_buildingid:"rezge1g524ez35g"},
    {tf_name:"BAT 8", tf_buildingid:"rezge1g524ez35g"},
    {tf_name:"BAT 9", tf_buildingid:"rezge1g524ez35g"}
  ],
  };
  constructor() { }

  ngOnInit() {
  }

}
