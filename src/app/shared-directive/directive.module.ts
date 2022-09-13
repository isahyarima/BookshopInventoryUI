import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyMaskDirective } from './directives/formatmoney.directive';
import { FormatMoneyDirective } from './directives/formatmoney.onblur.directive';
import { OverlayPanelComponent } from './overlay-panel/overlay-panel.component';

@NgModule({
  declarations: [CurrencyMaskDirective,
    FormatMoneyDirective,
    OverlayPanelComponent],
  imports: [
    CommonModule
  ],
  exports:[CurrencyMaskDirective,
    FormatMoneyDirective]
})
export class DirectiveModule { }
