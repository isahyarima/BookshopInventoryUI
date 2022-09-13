import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BreadcrumbService } from "src/app/shared/dashboard-layout/breadcrumb.service";
import { NgxSpinnerService } from "ngx-spinner";
import { BookshopService } from "../../../bookshop.service";

@Component({
    selector: "app-store",
    templateUrl: "./store.component.html",
    styleUrls: ["./store.component.css"],
})
export class StoreComponent implements OnInit {
    storeForm: FormGroup;
    displayDataInput: boolean = false;
    displayAddModal: boolean = false;
    storeList: any;
    storeId: Number = 0;
    selected: any;
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
            { label: "Store", routerLink: ["/store"] },
        ]);
    }

    ngOnInit() {
        this.IntStoreForm();
        this.getStore();
    }

    newRecord() {
        this.displayDataInput = true;
        this.IntStoreForm();
        this.storeId = 0;
    }

    IntStoreForm() {
        this.storeForm = this.fb.group({
            storeName: ["", Validators.required],
            storeNumber: ["", Validators.required],
            storeAddress: ["", Validators.required],
            contactNumber: ["", Validators.required],
            isActive: [""],
        });
    }

    SubmitStore(form) {
        let data = {
            storeId: form.value.storeId,
            storeName: form.value.storeName,
            storeNumber: form.value.storeNumber,
            storeAddress: form.value.storeAddress,
            contactNumber: form.value.contactNumber,
            tenantId: form.value.tenantId,
            isActive: this.isActive,
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
                if (this.storeId == 0) {
                    this.loadingService.show();
                    this.service.submitStore(data).subscribe(
                        (result: any) => {
                            if (result.success == true) {
                                this.getStore();
                                this.storeId = 0;
                                this.displayAddModal = false;
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
                    this.service.updateStore(data, this.storeId).subscribe(
                        (result: any) => {
                            if (result.success == true) {
                                this.getStore();
                                this.storeId = 0;
                                this.displayAddModal = false;
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
                this.IntStoreForm();
                this.loadingService.hide();
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
            }
        });
    }

    optionSwith(isChecked: boolean) {

        if (isChecked == true) {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
      }
      
    getStore() {
        this.cols = [
            { field: "storeName", header: "Store Name" },
            { field: "storeNumber", header: "Store Number" },
            { field: "storeAddress", header: "Store Address" },
            { field: "contactNumber", header: "Contact Number" },
        ];
        this.loadingService.show();
        this.service.getStore().subscribe(
            (result: any) => {
                if (result.success == true) {
                    this.storeList = result.response;
                    this.loadingService.hide();
                }
            },
            (error) => {}
        );
    }

    editStore(row) {
        this.storeForm.patchValue({
            storeId: row.storeId,
            storeName: row.storeName,
            storeNumber: row.storeNumber,
            storeAddress: row.storeAddress,
            contactNumber: row.contactNumber,
            tenantId: row.tenantId,
            isActive: row.isActive,
        });
        this.storeId = row.storeId;
        this.displayDataInput = true;
    }

    deleteStore(row) {
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
                this.service.deleteStore(row.storeId).subscribe(
                    (result: any) => {
                        if (result.success == true) {
                            this.getStore();

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
