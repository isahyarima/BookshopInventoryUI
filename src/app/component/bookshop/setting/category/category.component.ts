import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BreadcrumbService } from 'src/app/shared/dashboard-layout/breadcrumb.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BookshopService } from '../../../bookshop.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryForm: FormGroup;
  displayDataInput: boolean = false;
  displayAddModal: boolean = false;
  categoryList: any;
  categoryId: Number=0;
  selected:any;
  cols: { field: string; header: string; }[];

  constructor(private fb: FormBuilder, private loadingService: NgxSpinnerService,
   private service: BookshopService , private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: 'Settings' },
      { label: 'Category', routerLink: ['/category'] }
       ])
  }

  ngOnInit() {
      this.IntCategoryForm();
      this.getCategory();
  }

  newRecord(){
    this.displayDataInput=true;
    this.IntCategoryForm();
    this.categoryId=0;
  }

  IntCategoryForm() {
      this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
       
      });
  }

  SubmitCategory(form) {

    let data = {
	     categoryId: form.value.categoryId,
	       categoryName: form.value.categoryName,
	       dateCreated: form.value.dateCreated,
	       tenantId: form.value.tenantId,
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
        if(this.categoryId==0){
          this.loadingService.show();
          this.service.submitCategory(data).subscribe((result:any) => {
            if (result.success == true) {
               this.getCategory();
			   this.categoryId=0;
              this.displayAddModal = false;
              this.loadingService.hide();
			  Swal.fire(
                'Saved!',
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
        } else {
          this.loadingService.show();
            this.service.updateCategory(data, this.categoryId).subscribe((result:any) => {
            if (result.success == true) {
              this.getCategory();
			  this.categoryId=0;
              this.displayAddModal = false;
              this.loadingService.hide();
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
        }
        this.IntCategoryForm();
        this.loadingService.hide();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    })
  }

getCategory(){
this.cols = [
 { field :'categoryName',header : 'Category Name'  },
 ];
     this.loadingService.show();
  this.service.getCategory().subscribe((result:any) => {
    if(result.success == true){
      this.categoryList = result.response;    
        this.loadingService.hide();
    }
},
error => 
{})
}
  
editCategory(row){
this.categoryForm.patchValue({
 categoryId: row.categoryId,
 categoryName: row.categoryName,
 dateCreated: row.dateCreated,
 tenantId: row.tenantId,
});
this.categoryId = row.categoryId;
this.displayDataInput = true;

}

deleteCategory(row){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  Swal.fire({
  title: ' Delete User?',
  text: "Are you sure you want to delete this record ?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Start!'
  }).then((result) => {
    if (result.value) {

      this.service.deleteCategory(row.categoryId).subscribe((result:any) => {
        if(result.success == true){

          this.getCategory();

          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )     
        }
    },
    error => 
    {})
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