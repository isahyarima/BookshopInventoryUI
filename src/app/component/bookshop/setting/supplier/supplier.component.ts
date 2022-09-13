import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BreadcrumbService } from "src/app/shared/dashboard-layout/breadcrumb.service";
import { NgxSpinnerService } from "ngx-spinner";
import { BookshopService } from "../../../bookshop.service";
@Component({
    selector: "app-supplier",
    templateUrl: "./supplier.component.html",
    styleUrls: ["./supplier.component.css"],
})
export class SupplierComponent implements OnInit {
    supplierForm: FormGroup;
    displayDataInput: boolean = false;
    displayAddModal: boolean = false;
    supplierList: any;
    supplierId: Number = 0;
    selected: any;
    selectedCar: any;
    displayList: boolean = true;
    cols: { field: string; header: string }[];
    isActive: boolean;

    constructor(
        private fb: FormBuilder,
        private loadingService: NgxSpinnerService,
        private service: BookshopService,
        private breadcrumbService: BreadcrumbService
    ) {
        this.breadcrumbService.setItems([
            { label: "Settings" },
            { label: "Supplier", routerLink: ["/supplier"] },
        ]);
    }

    newSupplier() {
        this.displayDataInput = true;
        this.displayList = false;
    }

    ngOnInit() {
        this.IntSupplierForm();
        this.getSupplier();
    }

    newRecord() {
        this.displayDataInput = true;
        this.IntSupplierForm();
        this.supplierId = 0;
    }

    IntSupplierForm() {
        this.supplierForm = this.fb.group({
            supplierName: ["", Validators.required],
            address: ["", Validators.required],
            phoneNumber: ["", Validators.required],
            isActive: [""],
            emailAddress: ["", Validators.required],
        });
    }

    SubmitSupplier(form) {
        let data = {
            supplierName: form.value.supplierName,
            address: form.value.address,
            phoneNumber: form.value.phoneNumber,
            dateRegistered: form.value.dateRegistered,
            tenantId: form.value.tenantId,
            isActive: this.isActive,
            emailAddress: form.value.emailAddress,
        };

        Swal.fire({
            title: "Update Record?",
            text: "Are you sure you want to proceed ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Start!",
        }).then((result) => {
            if (result.value) {
                if (this.supplierId == 0) {
                    this.loadingService.show();
                    this.service.submitSupplier(data).subscribe(
                        (result: any) => {
                            if (result.success == true) {
                                this.getSupplier();
                                this.supplierId = 0;
                                this.displayDataInput = false;
                                this.displayList = true;
                                this.loadingService.hide();
                                Swal.fire(
                                    "Saved!",
                                    "Saved Successfully!",
                                    "success"
                                );
                            } else {
                                Swal.fire("Error!", result.error, "error");
                                this.loadingService.hide();
                            }
                        },
                        (error) => {}
                    );
                } else {
                    this.loadingService.show();
                    this.service
                        .updateSupplier(data, this.supplierId)
                        .subscribe(
                            (result: any) => {
                                if (result.success == true) {
                                    this.getSupplier();
                                    this.supplierId = 0;
                                    this.displayDataInput = false;
                                    this.displayList = true;
                                    this.loadingService.hide();
                                    Swal.fire(
                                        "Update!",
                                        "Saved Successfully!",
                                        "success"
                                    );
                                } else {
                                    Swal.fire("Error!", result.error, "error");
                                    this.loadingService.hide();
                                }
                            },
                            (error) => {}
                        );
                }
                this.IntSupplierForm();
                this.loadingService.hide();
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
            }
        });
    }

    getSupplier() {
        this.cols = [
            { field: "supplierName", header: "Supplier Name" },
            { field: "phoneNumber", header: "Phone Number" },
            { field: "emailAddress", header: "Email Address" },
            { field: "address", header: "Address" },

        ];
        this.loadingService.show();
        this.service.getSupplier().subscribe(
            (result: any) => {
                if (result.success == true) {
                    this.supplierList = result.response;
                    this.loadingService.hide();
                }
            },
            (error) => {}
        );
    }

    optionSwith(isChecked: boolean) {

        if (isChecked == true) {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
      }

    editSupplier(row) {
        this.supplierForm.patchValue({
            supplierId: row.supplierId,
            supplierName: row.supplierName,
            address: row.address,
            phoneNumber: row.phoneNumber,
            dateRegistered: row.dateRegistered,
            tenantId: row.tenantId,
            isActive: this.isActive,
            emailAddress: row.emailAddress,
        });
        this.supplierId = row.supplierId;
        this.displayDataInput = true;
        this.displayList = true;
    }

    deleteSupplier(row) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });

        Swal.fire({
            title: " Delete User?",
            text: "Are you sure you want to delete this record ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Start!",
        }).then((result) => {
            if (result.value) {
                this.service.deleteSupplier(row.supplierId).subscribe(
                    (result: any) => {
                        if (result.success == true) {
                            this.getSupplier();

                            swalWithBootstrapButtons.fire(
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                            );
                        }
                    },
                    (error) => {}
                );
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
            }
        });
    }
}

/*

*/
