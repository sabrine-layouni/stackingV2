import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
  declarations: [
    ToolbarComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
  ],

  providers: []
})
export class SharedModule { }
