import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './components/alert/alert.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DropdownDirective } from './directives/dropdown.directive';

@NgModule({
  declarations: [AlertComponent, SpinnerComponent, DropdownDirective],
  imports: [CommonModule],
  exports: [AlertComponent, SpinnerComponent, DropdownDirective, CommonModule],
})
export class SharedModule {}
