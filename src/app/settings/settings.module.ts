import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule, AutoCompleteModule, BreadcrumbModule, ButtonModule, 
  CalendarModule, CardModule, CarouselModule, ChartModule, CheckboxModule, ChipsModule, 
  CodeHighlighterModule, ColorPickerModule, ConfirmDialogModule, ContextMenuModule, 
  DialogModule, DropdownModule, EditorModule, FieldsetModule, FileUploadModule, 
  GalleriaModule,InplaceModule, InputMaskModule, InputSwitchModule, 
  InputTextareaModule, InputTextModule, LightboxModule, ListboxModule, MegaMenuModule,
   MenubarModule, MenuModule, MessageModule, MessagesModule, MultiSelectModule, OrderListModule, 
   OrganizationChartModule, OverlayPanelModule, PaginatorModule, PanelMenuModule, 
   PanelModule, PasswordModule, PickListModule, ProgressBarModule, RadioButtonModule, 
   RatingModule, ScrollPanelModule, SelectButtonModule, SlideMenuModule, SliderModule, 
   SpinnerModule, SplitButtonModule, StepsModule, TabMenuModule, TabViewModule, TerminalModule, 
   TieredMenuModule, ToggleButtonModule, ToolbarModule, TooltipModule, 
   TreeModule, TreeTableModule } from 'primeng/primeng';
import { DataViewModule } from 'primeng/dataview';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GlobalSettingComponent } from './global-setting/global-setting.component';
import { CurrencyTypeComponent } from './currency-type/currency-type.component';

@NgModule({
  declarations: [
    GlobalSettingComponent,
    CurrencyTypeComponent,
    ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    AccordionModule,
    AutoCompleteModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    ChartModule,
    CheckboxModule,
    ChipsModule,
    CodeHighlighterModule,
    ConfirmDialogModule,
    ColorPickerModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    EditorModule,
    FieldsetModule,
    FileUploadModule,
    FullCalendarModule,
    GalleriaModule,
    InplaceModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    LightboxModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    ScrollPanelModule,
    SelectButtonModule,
    SlideMenuModule,
    SliderModule,
    SpinnerModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TerminalModule,
    TieredMenuModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,
    VirtualScrollerModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  exports:[]
})
export class SettingsModule { }