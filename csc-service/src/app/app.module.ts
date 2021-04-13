import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { DropletComponent } from './pages/droplet/droplet.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { VerifyComponent } from './pages/auth/verify/verify.component';
import { ForgotComponent } from './pages/auth/forgot/forgot.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DropletComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    VerifyComponent,
    ForgotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
