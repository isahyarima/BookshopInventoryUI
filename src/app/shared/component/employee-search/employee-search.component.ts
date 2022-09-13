import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BreadcrumbService } from 'src/app/shared/dashboard-layout/breadcrumb.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit {

  selectedCar: any;
  cols: { field: string; header: string; }[];
  searchTerm$ = new Subject<string>();
  employeeForm: FormGroup;
  displayDataInput: boolean = false;
  employeeList: any;
  employeeId: Number = 0;
  selected: any;
  searchInput: any;
  @Input() showEditButton: boolean = false;
  @Output() employeeData: EventEmitter<number> = new EventEmitter();

  constructor(private fb: FormBuilder, private loadingService: NgxSpinnerService, private router: Router,
    private service: SharedService) {
   
    this.loadingService.show();
    this.service.searchForEmployeeReg(this.searchTerm$).subscribe((result: any) => {
      this.employeeList = result.response;
      this.loadingService.hide();
    });
    this.loadingService.hide();
  }
  ngOnInit() {
    this.getHR_Employee();
  }

  getHR_Employee() {
    this.cols = [

      { field: 'employeeNumber', header: 'Employee Number' },
      { field: 'name', header: 'Name' },
      { field: 'phoneNumber', header: 'Phone Number' },
      { field: 'departmentName', header: 'Department' },

    ];
  }
  viewEmployeeDetail(row) {
    this.employeeData.emit(row);
    this.router.navigate(['/employee-detail-view'], { queryParams: { em: row.employeeId, emt: row.employeeTypeId }, });
  }

  editHR_Employee(row) {
    this.employeeData.emit(row);
    this.router.navigate(['/employee-manage'], { queryParams: { em: row.employeeId, emt: row.employeeTypeId } });
  }


  selectEmployee(row){
    this.employeeData.emit(row);
  }
}
