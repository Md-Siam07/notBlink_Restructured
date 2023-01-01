import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    RouterModule
  ]
})
export class AuthModule { }
