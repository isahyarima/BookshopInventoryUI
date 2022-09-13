import { Component } from '@angular/core';
import {NgModule} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { SettingService } from 'src/app/settings/setting.service';
import { AppLayoutComponent } from '../app-layout/app-layout/app-layout.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
  image: any;

  constructor(private auth: AuthenticationService, private loadingService : NgxSpinnerService,private settingService: SettingService,public app: AppLayoutComponent) {}

  ngOnInit() {
    this.getFileUpload()
}

getFileUpload() {
 this.loadingService.show();
this.settingService.getGlobalSetting().subscribe((result: any) => {
  if (result.success == true) {
    this.image = result.response[0].barLogoData;
    this.loadingService.hide();
  }
},
  error => { })
  this.loadingService.hide();
}

logout(){
this.auth.logout();
}

}
