import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RoutePath } from '../shared/enums/route-path';

const routes: Routes = [
  {
    path: RoutePath.Auth,
    component: AuthComponent,
    children: [
      {
        path: RoutePath.Register,
        component: RegisterComponent
      },
      {
        path: RoutePath.Login,
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
