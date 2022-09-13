import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BreadcrumbService } from 'src/app/shared/dashboard-layout/breadcrumb.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingService } from '../setting.service';
import { UserTypeEnum } from 'src/app/shared/common/enum/user-type';

@Component({
  selector: 'app-global-setting',
  templateUrl: './global-setting.component.html',
  styleUrls: ['./global-setting.component.css']
})
export class GlobalSettingComponent implements OnInit {

  globalSettingForm: FormGroup;
  displayAddModal: boolean = false;
  globalSettingList: any;
  tenantId: Number = 0;
  cols: { field: string; header: string; }[];
  selectedCar: any;
  displayDataInput: boolean = false;
  displayList: boolean = true;
  countries: any;
  countryArray: any[];
  state: any;
  stateArray: any[];
  lga: any;
  lgaArray: any[];
  logoType: any;
  main:any;
  bar:any;


  constructor(private fb: FormBuilder, private loadingService: NgxSpinnerService,
    private settingService: SettingService, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: 'Settings' },
      { label: 'Global Setting', routerLink: ['/globalSetting'] }
    ])
  }

  ngOnInit() {
    this.IntGlobalSettingForm();
    this.getGlobalSetting();
    this.getState();
  }



  newRecord() {
    this.displayAddModal = true;
    this.IntGlobalSettingForm();
    this.tenantId = 0;
  }

  IntGlobalSettingForm() {
    this.globalSettingForm = this.fb.group({
      name: ['', Validators.required],
      shortName: ['', Validators.required],
      address: ['', Validators.required],
      stateId: ['', Validators.required],
      localGovtId: ['', Validators.required],
      yearOfEstablishment: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', Validators.required],
      webAddress: ['', Validators.required],
      companyMotto: ['', Validators.required],
      contactPerson: ['', Validators.required],
      contactPersonPhone: ['', Validators.required],
      contactPersonEmail: ['', Validators.required],
    });
  }

  SubmitGlobalSetting(form) {
    let data = {
      name: form.value.name,
	       address: form.value.address,
	       stateId: form.value.stateId,
	       localGovtId: form.value.localGovtId,
	       yearOfEstablishment: form.value.yearOfEstablishment,
	       contactNumber: form.value.contactNumber,
	       email: form.value.email,
	       webAddress: form.value.webAddress,
	       companyMotto: form.value.companyMotto,
	       contactPerson: form.value.contactPerson,
	       contactPersonPhone: form.value.contactPersonPhone,
	       contactPersonEmail: form.value.contactPersonEmail,
         shortName: form.value.shortName
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
        if (this.tenantId == 0) {
          this.loadingService.show();
          this.settingService.submitGlobalSetting(data).subscribe((result: any) => {
            if (result.success == true) {
              this.getGlobalSetting();
              Swal.fire(
                'Success!',
                'Saved Successfully!',
                'success'
              )
              this.loadingService.hide();
            } else {
              Swal.fire(
                'Error!',
                result.error,
                'error'
              )
            }
          },
            error => { })
        } else {
          this.loadingService.show();
          this.settingService.updateGlobalSetting(data, this.tenantId).subscribe((result: any) => {
            if (result.success == true) {
              this.getGlobalSetting();
              Swal.fire(
                'Success!',
                'Saved Successfully!',
                'success'
              )
              // this.IntGlobalSettingForm();
              this.loadingService.hide();
              //this.tenantId = 0;
            } else {
              Swal.fire(
                'Error!',
                result.error,
                'error'
              )
            }
          },
            error => { this.loadingService.hide();})
        }
       
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    })

  }

  getGlobalSetting() {
    this.cols = [
      { field: 'code', header: 'Reg Code' },
      { field: 'name', header: 'Name' },
      { field: 'shortName', header: 'Short Name' },
      { field: 'yearOfEstablishment', header: 'Year Of Establishment' },
      { field: 'contactPerson', header: 'Contact Person' },
      { field: 'contactNumber', header: 'Contact Number' },
      { field: 'email', header: 'Email' },
    ];
    this.loadingService.show();
    this.settingService.getGlobalSetting().subscribe((result: any) => {
      if (result.success == true) {
        this.globalSettingList = result.response;
        this.newGlobalSetting();
        this.loadingService.hide();
      }
    },
      error => {  this.loadingService.hide();})
     
  }

  getCountry() {
    this.loadingService.show();
    this.settingService.getSetup_Country().subscribe((result: any) => {
      if (result.success == true) {
        this.countries = result.response;

        this.countryArray = [];

        this.countryArray.push({ label: 'Select Nationality', value: '' });
        for (let i = 0; i < this.countries.length; i++) {
          this.countryArray.push({ label: this.countries[i].countryName, value: this.countries[i].countryId });
        }
        this.loadingService.hide();
      }
    })
  }


  getState() {
    this.loadingService.show();
    this.settingService.getSetup_State().subscribe((result: any) => {
      if (result.success == true) {
        this.state = result.response;

        this.stateArray = [];

        this.stateArray.push({ label: 'Select State', value: '' });
        for (let i = 0; i < this.state.length; i++) {
          this.stateArray.push({ label: this.state[i].stateName, value: this.state[i].stateId });
        }
        this.loadingService.hide();
      }
    })
  }

  getSelectedLGA(stateId) {
    this.loadingService.show();
    this.settingService.getSetup_LocalGovt(stateId).subscribe((result: any) => {
      if (result.success == true) {
        this.lga = result.response;

        this.lgaArray = [];

        this.lgaArray.push({ label: 'Select Local Govt', value: '' });
        for (let i = 0; i < this.lga.length; i++) {
          this.lgaArray.push({ label: this.lga[i].localGovtName, value: this.lga[i].localGovtId });
        }
        this.loadingService.hide();
      }
    })
  }

  newGlobalSetting() {

    if (this.globalSettingList.length != 0) {
      this.globalSettingForm.patchValue({
        code: this.globalSettingList[0].code,
        name: this.globalSettingList[0].name,
        address: this.globalSettingList[0].address,
        yearOfEstablishment: this.globalSettingList[0].yearOfEstablishment,
        stateId: this.globalSettingList[0].stateId,
        localGovtId: this.globalSettingList[0].localGovtId,
        contactNumber: this.globalSettingList[0].contactNumber,
        email1: this.globalSettingList[0].email1,
        contactPerson: this.globalSettingList[0].contactPerson,
        email: this.globalSettingList[0].email,
        webAddress: this.globalSettingList[0].webAddress,
        companyMotto: this.globalSettingList[0].companyMotto,
        officeNumber: this.globalSettingList[0].officeNumber,
        contactPersonPhone: this.globalSettingList[0].contactPersonPhone,
        contactPersonEmail: this.globalSettingList[0].contactPersonEmail,
        shortName: this.globalSettingList[0].shortName,

      });
      this.tenantId = this.globalSettingList[0].tenantId;
      this.displayAddModal = true;
      this.displayList = false; this.displayDataInput = true;
    }
    this.displayDataInput = true; this.displayList = false;
    this.getSelectedLGA(this.globalSettingList[0].stateId)
  }
  editGlobalSetting(row) {
    this.globalSettingForm.patchValue({
      name: row.name,
      address: row.address,
      stateId: row.stateId,
      localGovtId: row.localGovtId,
      yearOfEstablishment: row.yearOfEstablishment,
      contactNumber: row.contactNumber,
      email: row.email,
      webAddress: row.webAddress,
      companyMotto: row.companyMotto,
      contactPerson: row.contactPerson,
      contactPersonPhone: row.contactPersonPhone,
      contactPersonEmail: row.contactPersonEmail,
      shortName: row.shortName
    });
    this.tenantId = row.tenantId;
    this.displayAddModal = true;
    this.displayList = false; this.displayDataInput = true;
  }

  deleteGlobalSetting(row) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    Swal.fire({
      title: ' Delete User?',
      text: "Are you sure you want to delete : ' ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Start!'
    }).then((result) => {
      if (result.value) {

        this.settingService.deleteGlobalSetting(row.tenantId).subscribe((result: any) => {
          if (result.success == true) {

            this.getGlobalSetting();

            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        },
          error => { this.loadingService.hide(); })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    })
  }

}

/*

*/


