import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropletComponent } from './droplet.component';


@NgModule({
  declarations: [
    DropletComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DropletComponent }
    ])
  ]
})
export class DropletModule { }
