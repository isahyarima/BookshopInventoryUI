import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import Swal from 'sweetalert2';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  emailConfirmationForm: FormGroup;
  id: string;
  application: any;

  constructor(private fb: FormBuilder, private loadingService: NgxSpinnerService,
    private service: AuthenticationService,private router: ActivatedRoute,private routerNav: Router) { }

  ngOnInit() {
    this.IntApplication_UndergraduateForm();
    this.IsLinkValid();
  }

  IntApplication_UndergraduateForm() {
    this.emailConfirmationForm = this.fb.group({
      emailAddress: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],

    });
  }

  IsLinkValid() {
    this.id = this.router.snapshot.queryParamMap.get('id');
   let data={
    confirmationId:this.id
    }
    this.loadingService.show();
    this.service.IsLinkValid(data).subscribe((result: any) => {
      if (result.success == true) {
        this.application = result.response;
        this.emailConfirmationForm.controls['emailAddress'].patchValue(this.application.emailAddress)
        this.loadingService.hide();
      }
    },
      error => { })
      this.loadingService.hide();
  }
  onPasswordChange() {
    if (this.emailConfirmationForm.get("confirmPassword").value != this.emailConfirmationForm.get("password").value) {
      Swal.fire(
        'Password Confirmation Failed!',
        ' Password did not matched!',
        'error'
      )

      this.emailConfirmationForm.get("confirmPassword").setValue("")
    }
  }
  
  SubmitPassword(form){
    let data = {
      emailAddress: form.value.emailAddress,
      password:form.value.password,
      confirmationId: this.id
    }

    Swal.fire({
      title: 'Update Record?',
      text: "Are you sure you want to proceed ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Start!'
    }).then((result) => {
      if (result.value) {

          this.loadingService.show();
          this.service.submitCreatePassword(data).subscribe((result: any) => {
            if (result.success == true) {
              this.loadingService.hide();
              Swal.fire(
                'Update!',
                'Password created succesfully. Please login and complete your application!',
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
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    })
  }
}
