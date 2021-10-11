import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavAdminComponent } from './components/nav-admin/nav-admin.component';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';

const modules = [
  RouterModule,
  MatRippleModule
];

@NgModule({
  declarations: [
    NavAdminComponent
  ],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    NavAdminComponent,
    ...modules
  ]
})
export class SharedModule { }
