import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookshopRoutingModule } from './bookshop-routing.module';
import { CategoryComponent } from './setting/category/category.component';
import { BankComponent } from './setting/bank/bank.component';
import { AuthorComponent } from './setting/author/author.component';
import { PublisherComponent } from './setting/publisher/publisher.component';
import { StoreComponent } from './setting/store/store.component';
import { SupplierComponent } from './setting/supplier/supplier.component';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule, AccordionModule, AutoCompleteModule, BreadcrumbModule, ButtonModule, CalendarModule, CardModule, CarouselModule, ChartModule, CheckboxModule, ChipsModule, CodeHighlighterModule, ConfirmDialogModule, ColorPickerModule, ContextMenuModule, DialogModule, DropdownModule, EditorModule, FieldsetModule, FileUploadModule, GalleriaModule, GrowlModule, InplaceModule, InputMaskModule, InputSwitchModule, InputTextModule, InputTextareaModule, LightboxModule, ListboxModule, MegaMenuModule, MenuModule, MenubarModule, MessageModule, MessagesModule, MultiSelectModule, OrderListModule, OrganizationChartModule, OverlayPanelModule, PaginatorModule, PasswordModule, PickListModule, ProgressBarModule, RadioButtonModule, RatingModule, ScrollPanelModule, SelectButtonModule, SlideMenuModule, SliderModule, SpinnerModule, SplitButtonModule, StepsModule, TabMenuModule, TabViewModule, TerminalModule, TieredMenuModule, ToggleButtonModule, ToolbarModule, TooltipModule, TreeModule, TreeTableModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { BookComponent } from './book/book.component';
import { DirectiveModule } from 'src/app/shared-directive/directive.module';
import { PurchaseRegisterComponent } from './purchase-register/purchase-register.component';

@NgModule({
  declarations: [CategoryComponent, BankComponent, 
        PurchaseOrderComponent,
        PurchaseRegisterComponent,
        AuthorComponent, PublisherComponent, StoreComponent, SupplierComponent, BookComponent,],
  imports: [
    CommonModule,
    BookshopRoutingModule,
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
    GrowlModule,
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
    RichTextEditorAllModule,
    NgxSpinnerModule,
    DirectiveModule
  ]
})
export class BookshopModule { }
