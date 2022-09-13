import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BreadcrumbService } from 'src/app/shared/dashboard-layout/breadcrumb.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingService } from '../setting.service';

@Component({
  selector: 'app-currency-type',
  templateUrl: './currency-type.component.html',
  styleUrls: ['./currency-type.component.css']
})
export class CurrencyTypeComponent implements OnInit {

  
  finance_CurrencyTypeForm: FormGroup;
  displayDataInput: boolean = false;
  displayAddModal: boolean = false;
  finance_CurrencyTypeList: any;
  currencyTypeId: Number=0;
  selected:any;
  selectedCar: any;
  displayList: boolean = true;
  cols: { field: string; header: string; }[];
  currency: any;
  currencyArray: any[];


  constructor(private fb: FormBuilder, private loadingService: NgxSpinnerService,
    private service: SettingService , private breadcrumbService: BreadcrumbService) {
     this.breadcrumbService.setItems([
       { label: 'Settings' },
       { label: 'Currency Type', routerLink: ['/finance_CurrencyType'] }
        ])
   }  

  ngOnInit(): void {
    this.getFinance_CurrencyType();
    this.IntFinance_CurrencyTypeForm();
    this.getCurrency();
  }
  IntFinance_CurrencyTypeForm() {
    this.finance_CurrencyTypeForm = this.fb.group({
        currencyTypeId: ['', Validators.required],
    });
}


getCurrency() {
  this.loadingService.show();
  this.service.getFinance_CurrencyType().subscribe((result: any) => {
    if (result.success == true) {
      this.currency = result.response;
      this.currencyArray = [];
      this.currencyArray.push({ label: 'Select Currency', value: '' });
      for (let i = 0; i < this.currency.length; i++) {
        this.currencyArray.push({ label: this.currency[i].currencyTypeName + ' - ' + this.currency[i].currencyTypeName + ' - ( ' + this.currency[i].currencyCode + ' - ' + this.currency[i].symbol + ' )', value: this.currency[i].currencyTypeId });
      }
      this.loadingService.hide();

    }
  })
 // this.loadingService.hide();
}

getSelectedCurrency(id){
this.currencyTypeId = id;
}

SubmitFinance_CurrencyType() {

  let data = {
      currencyTypeId: this.currencyTypeId,
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
      this.service.updateFinance_CurrencyType(data, this.currencyTypeId).subscribe((result:any) => {
        if (result.success == true) {
    this.currencyTypeId=0;
          this.displayDataInput = false;
          this.displayList = true;
          this.loadingService.hide();
          this.getFinance_CurrencyType();
    Swal.fire(
            'Update!',
            'Saved Successfully!',
            'success'
          )
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

getFinance_CurrencyType(){
 
   this.loadingService.show();
    this.service.getFinanceCurrencyType().subscribe((result:any) => {
      if(result.success == true){
        this.finance_CurrencyTypeList = result.response;
    this.loadingService.hide();
      }
  },
  error => 
  {})
  }

}
