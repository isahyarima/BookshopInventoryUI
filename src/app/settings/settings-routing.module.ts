import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/http/guards/auth-guard.service';
import { CurrencyTypeComponent } from './currency-type/currency-type.component';
import { GlobalSettingComponent } from './global-setting/global-setting.component';

const routes: Routes = [
  {
    path: '',
    children: [
     {
        path: 'global-setting', component: GlobalSettingComponent, canActivate: [AuthGuardService]
      },
      {
        path: 'currency-type', component: CurrencyTypeComponent, canActivate: [AuthGuardService]
      },
      
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
