import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavAdminComponent } from './components/nav-admin/nav-admin.component';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { SearchPipe } from './pipes/search.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SetToArrayPipe } from './pipes/set-to-array.pipe';
import { MatButtonModule } from '@angular/material/button';

const modules = [
  RouterModule,
  MatRippleModule,
  MatProgressSpinnerModule,
  MatButtonModule
];

@NgModule({
  declarations: [
    NavAdminComponent,
    SearchPipe,
    SetToArrayPipe
  ],
  imports: [
    CommonModule,
    ...modules
  ],
    exports: [
        NavAdminComponent,
        ...modules,
        SearchPipe,
        SetToArrayPipe
    ]
})
export class SharedModule { }
