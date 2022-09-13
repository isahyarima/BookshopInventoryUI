import { SettingService } from './../../settings/setting.service';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-footer',
  templateUrl: './app.footer.component.html',
  styleUrls: ['./app.footer.component.css']
})
export class AppFooterComponent {
  globalSetting: any;
  year: Date;
  companyName: any;
  address: any;
  contactNumber: any;
  email: any;

  constructor(private settingService: SettingService, private loadingService : NgxSpinnerService,) {
   
  }

  ngOnInit() {
    this.getGlobalSetting()
}

getGlobalSetting() {
 this.loadingService.show();
 this.settingService.getGlobalSetting().subscribe((result: any) => {
   if (result.success == true) {
     this.globalSetting = result.response[0];
     this.loadingService.hide();
     this.year = new Date();
   }
 }, error => { this.loadingService.hide();})
   
}

}
