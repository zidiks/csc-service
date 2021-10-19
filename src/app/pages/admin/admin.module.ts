import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SkillsComponent } from './skills/skills.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AdminComponent,
    SkillsComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatTooltipModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        children: [
          {path: 'home', component: HomeComponent},
          {path: 'skills', component: SkillsComponent},
          {path: '', redirectTo: 'home'}
        ]
      }
    ]),
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule { }
