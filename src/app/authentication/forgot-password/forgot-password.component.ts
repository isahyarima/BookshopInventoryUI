import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  baseUrl = environment.baseUrl;
  emailConfirmationForm: FormGroup;
  id: string;
  application: any;

  constructor(private fb: FormBuilder, private loadingService: NgxSpinnerService,
    private service: AuthenticationService,private router: ActivatedRoute,private routerNav: Router) { }

  ngOnInit() {
    this.IntApplication_UndergraduateForm();
  }

  IntApplication_UndergraduateForm() {
    this.emailConfirmationForm = this.fb.group({
      emailAddress: ['', Validators.required],
    });
  }

  
  SubmitPassword(form){
    let data = {
      emailAddress: form.value.emailAddress,
      link: this.baseUrl+ 'auth/password-reset?id='
    }
    this.loadingService.show();
    this.service.ForgotPassword(data).subscribe((result: any) => {
      if (result.success == true) {
        this.loadingService.hide();
        Swal.fire(
          'Update!',
          'A link has been sent to your mail. Please login and reset your password!',
          'success'
        )
        this.routerNav.navigate(['/auth/login']);
      } else {
        Swal.fire(
          'Error!',
          result.error,
          'error'
        )
        this.loadingService.hide();
      }
    },
      error => { })
  
  this.loadingService.hide();
  
  }
}
