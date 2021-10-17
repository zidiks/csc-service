import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavAdminComponent } from './components/nav-admin/nav-admin.component';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { SearchPipe } from './pipes/search.pipe';

const modules = [
  RouterModule,
  MatRippleModule
];

@NgModule({
  declarations: [
    NavAdminComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    ...modules
  ],
    exports: [
        NavAdminComponent,
        ...modules,
        SearchPipe
    ]
})
export class SharedModule { }
