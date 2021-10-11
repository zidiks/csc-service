import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SkillsComponent } from './skills/skills.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    AdminComponent,
    SkillsComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        children: [
          { path: 'home', component: HomeComponent },
          { path: 'skills', component: SkillsComponent },
          { path: '', redirectTo: 'home' }
        ]
      }
    ])
  ]
})
export class AdminModule { }
