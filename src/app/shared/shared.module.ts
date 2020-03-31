import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { NatureComponent } from './activity/nature/nature.component';
import { OccupantComponent } from './activity/occupant/occupant.component';
import { OwnerComponent } from './activity/owner/owner.component';
import { ProposedSurfaceComponent } from './activity/proposed-surface/proposed-surface.component';
import { AddBuildingComponent } from './popins/add-building/add-building.component';
import { ManageFloorComponent } from './popins/manage-floor/manage-floor.component';
import { ManageParkingsComponent } from './popins/manage-parkings/manage-parkings.component';
import { ChooseBuildingModeComponent } from './popins/choose-building-mode/choose-building-mode.component';


@NgModule({
  declarations: [
    ToolbarComponent,
    SidebarComponent,
    NatureComponent,
    OccupantComponent,
    OwnerComponent,
    ProposedSurfaceComponent,
    AddBuildingComponent,
    ManageFloorComponent,
    ManageParkingsComponent,
    ChooseBuildingModeComponent,
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
  ],

  providers: []
})
export class SharedModule { }
