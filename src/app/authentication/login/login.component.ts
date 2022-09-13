import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingService } from 'src/app/settings/setting.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginValidated: boolean;
  loginForm: FormGroup;
  invalidLogin: boolean;
  msgs: any;
  show2FA: boolean = false;
  showLogin: boolean = true;
  username: any;
  message:any;

  ErrorMessage: any; login2FAForm: FormGroup;
  twoFAusername: any;
  validationToken: string;
  image: any;
  globalSetting: any;
  isSubmitted: boolean;
  error: any;
  topImage: any;
  returnUrl: string;
  constructor(private auth: AuthenticationService,
    private router: Router,
    private fb: FormBuilder, 
    private settingService: SettingService, 
    private loadingService: NgxSpinnerService,
    private route: ActivatedRoute,) {
     }

  ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];

    this.initializeFormControls();
    this.getFileUpload();
  }

  initializeFormControls() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.login2FAForm = this.fb.group({
      token: ['', Validators.required]
    })
  }


  login(form) {
    let data = {
      userName: form.value.username,
      password: form.value.password,
      grant_type: 'password'
    }
    this.loadingService.show();
    this.auth.tokenValidation(data).subscribe(result => {
      ////console.log('result',result);
      
      if (result.isAuthenticated == 'true') {
        
        this.auth.getActivities(result.idr).subscribe((resp: any) => {
          if (resp.success == true) {
            localStorage.setItem('activities', JSON.stringify(resp.response));
            if(this.returnUrl){
              this.router.navigateByUrl(this.returnUrl);
            }else{
              this.invalidLogin = false;
              this.router.navigate(['/main/dashboard']);
            }
            
          }else{
            this.loadingService.hide();
          }
        })
      }
      else{
        this.message = result.message;
        this.loadingService.hide();
      }
    },
      error => {
        this.invalidLogin = true;
      })
    this.loginValidated = true;

    if (this.loginValidated) {

      if (this.auth.loggedIn) {


      }
      else {
        //navigate to dashboard

      }

    }
    else {
      //display login error message
    }
  }

  showErrorViaMessages() {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
  }

  getActivities(roleId) {
    this.auth.getActivities(roleId).subscribe((resp: any) => {
      if (resp.success == true) {

        localStorage.setItem('activities', JSON.stringify(resp.result));
      }

    })
  }


 

  getFileUpload() {
    this.loadingService.show();
    this.settingService.getGlobalSetting().subscribe((result: any) => {
      if (result.success == true) {
        this.image = result.response[0].logoData;
        this.topImage = result.response[0].barLogoData;
        this.loadingService.hide();
        //////console.log('this.topImage',this.topImage);
        //////console.log('this.image',this.image);
        
        
      }
    },
      error => { })
      this.loadingService.hide();
  }

}
