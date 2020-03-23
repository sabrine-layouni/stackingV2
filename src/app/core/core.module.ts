import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrmDataService } from './services/crm.data.service';
import { CrmService } from './services/crm.service';
import { WidowService } from './services/widow.service';
import { CssService } from './services/css.service';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent
  ],
  imports: [
    CommonModule
  ],

  providers: [
    CrmDataService,
    CrmService,
    WidowService,
    CssService,
  ]
})
export class CoreModule { }
