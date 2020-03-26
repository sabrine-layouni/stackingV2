import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { FloorComponent } from './floor/floor.component';


@NgModule({
  declarations: [
    ToolbarComponent,
    SidebarComponent,
    FloorComponent,
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
  ],

  providers: []
})
export class SharedModule { }
