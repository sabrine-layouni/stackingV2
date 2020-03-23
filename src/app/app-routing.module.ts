import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/home/home.component';

const Routes: Routes = [

    { path: ':guid', component: HomeComponent },
    { path: 'guid/:guid', component: HomeComponent },
    { path: '**', component: HomeComponent },
  ];
   
@NgModule({
  imports: [RouterModule.forRoot(Routes, { enableTracing: false })],
  exports: [RouterModule]
})

export class AppRoutingModule { } 