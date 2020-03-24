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

import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TabViewModule} from 'primeng/tabview';
import {AccordionModule} from 'primeng/accordion';

@NgModule({
  declarations: [
    ToolbarComponent,
    SidebarComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    TabViewModule,
    AccordionModule
  ],

  providers: [
    CrmDataService,
    CrmService,
    WidowService,
    CssService,
  ]
})
export class CoreModule { }
