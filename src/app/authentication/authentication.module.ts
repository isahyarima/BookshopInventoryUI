import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { MessageModule } from 'primeng/message';
import { AccordionModule, AutoCompleteModule, BreadcrumbModule, ButtonModule, CalendarModule, CardModule, CarouselModule, ChartModule, CheckboxModule, ChipsModule, CodeHighlighterModule, ColorPickerModule, ConfirmDialogModule, ContextMenuModule, DialogModule, DropdownModule, EditorModule, FieldsetModule, FileUploadModule, GalleriaModule,  InplaceModule, InputMaskModule, InputSwitchModule, InputTextareaModule, InputTextModule, LightboxModule, ListboxModule, MegaMenuModule, MenubarModule, MenuModule, MessagesModule, MultiSelectModule, OrderListModule, OrganizationChartModule, OverlayPanelModule, PaginatorModule, PanelMenuModule, PanelModule, PasswordModule, PickListModule, ProgressBarModule, RadioButtonModule, RatingModule, ScrollPanelModule, SelectButtonModule, SlideMenuModule, SliderModule, SpinnerModule, SplitButtonModule, StepsModule, TabMenuModule, TabViewModule, TerminalModule, TieredMenuModule, ToggleButtonModule, ToolbarModule, TooltipModule, TreeModule, TreeTableModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';


@NgModule({
  declarations: [AccessDeniedComponent, ErrorPageComponent, PasswordResetComponent,
    NotFoundComponent, LoginComponent, EmailConfirmationComponent, ForgotPasswordComponent
    ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
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
    TabMenuModule,
    TabViewModule,
    TerminalModule,
    TieredMenuModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,
    ReactiveFormsModule,
    // NgxSpinnerModule,
  ]
})
export class AuthenticationModule { }
