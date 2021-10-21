import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SkillsComponent } from './skills/skills.component';
import { AddSkillDialogComponent, SkillComponent } from './skill/skill.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AdminComponent,
    SkillsComponent,
    HomeComponent,
    SkillComponent,
    AddSkillDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        children: [
          {path: 'home', component: HomeComponent},
          {path: 'skills', component: SkillsComponent},
          {path: 'skills/:id', component: SkillComponent},
          {path: '', redirectTo: 'home'}
        ]
      }
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule { }
