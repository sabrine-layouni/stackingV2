import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrmDataService } from './services/crm.data.service';
import { CrmService } from './services/crm.service';
import { WidowService } from './services/widow.service';
import { CssService } from './services/css.service';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { ToolbarComponent } from '../shared/toolbar/toolbar.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { ParkingsComponent } from '../shared/parkings/parkings.component';

import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TabViewModule} from 'primeng/tabview';
import {AccordionModule} from 'primeng/accordion';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DragDropModule} from 'primeng/dragdrop';
import {CarouselModule} from 'primeng/carousel';
import { BuildingComponent } from '../shared/building/building.component';
import { CellModeComponent } from './cell-mode/cell-mode.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    SidebarComponent,
    ParkingsComponent,
    HomeComponent,
    AboutComponent,
    BuildingComponent,
    CellModeComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    TabViewModule,
    AccordionModule,
    ToolbarModule,
    ButtonModule,
    CardModule,
    DragDropModule,
    CarouselModule
  ],

  providers: [
    CrmDataService,
    CrmService,
    WidowService,
    CssService,
  ]
})
export class CoreModule { }
