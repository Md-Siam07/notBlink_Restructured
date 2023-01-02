import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    NavBarComponent    
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingSpinnerComponent,
    NavBarComponent
  ]
})
export class SharedModule { }
