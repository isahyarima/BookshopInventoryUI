import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BreadcrumbService } from "src/app/shared/dashboard-layout/breadcrumb.service";
import { NgxSpinnerService } from "ngx-spinner";
import { BookshopService } from "../../../bookshop.service";

@Component({
    selector: "app-bank",
    templateUrl: "./bank.component.html",
    styleUrls: ["./bank.component.css"],
})
export class BankComponent implements OnInit {
    bankForm: FormGroup;
    displayDataInput: boolean = false;
    displayAddModal: boolean = false;
    bankList: any;
    bankId: Number = 0;
    selected: any;
    cols: { field: string; header: string }[];

    constructor(
        private fb: FormBuilder,
        private loadingService: NgxSpinnerService,
        private service: BookshopService,
        private breadcrumbService: BreadcrumbService
    ) {
        this.breadcrumbService.setItems([
            { label: "Settings" },
            { label: "Bank", routerLink: ["/bank"] },
        ]);
    }

    ngOnInit() {
        this.IntBankForm();
        this.getBank();
    }

    newRecord() {
        this.displayDataInput = true;
        this.IntBankForm();
        this.bankId = 0;
    }

    IntBankForm() {
        this.bankForm = this.fb.group({
            bankName: ["", Validators.required],
            accountHolder: ["", Validators.required],
            branchName: ["", Validators.required],
            bankAddress: ["", Validators.required],
            accountNumber: ["", Validators.required],
        });
    }

    SubmitBank(form) {
        let data = {
            bankId: form.value.bankId,
            bankName: form.value.bankName,
            accountHolder: form.value.accountHolder,
            branchName: form.value.branchName,
            bankAddress: form.value.bankAddress,
            accountNumber: form.value.accountNumber,
            tenantId: form.value.tenantId,
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
                if (this.bankId == 0) {
                    this.loadingService.show();
                    this.service.submitBank(data).subscribe(
                        (result: any) => {
                            if (result.success == true) {
                                this.getBank();
                                this.bankId = 0;
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
                    this.service.updateBank(data, this.bankId).subscribe(
                        (result: any) => {
                            if (result.success == true) {
                                this.getBank();
                                this.bankId = 0;
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
                this.IntBankForm();
                this.loadingService.hide();
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
            }
        });
    }

    getBank() {
        this.cols = [
            { field: "bankName", header: "Bank Name" },
            { field: "accountHolder", header: "Account Holder" },
            { field: "accountNumber", header: "Account Number" },
        ];
        this.loadingService.show();
        this.service.getBank().subscribe(
            (result: any) => {
                if (result.success == true) {
                    this.bankList = result.response;
                    this.loadingService.hide();
                }
            },
            (error) => {}
        );
    }

    editBank(row) {
        this.bankForm.patchValue({
            bankId: row.bankId,
            bankName: row.bankName,
            accountHolder: row.accountHolder,
            branchName: row.branchName,
            bankAddress: row.bankAddress,
            accountNumber: row.accountNumber,
            tenantId: row.tenantId,
        });
        this.bankId = row.bankId;
        this.displayDataInput = true;
    }

    deleteBank(row) {
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
                this.service.deleteBank(row.bankId).subscribe(
                    (result: any) => {
                        if (result.success == true) {
                            this.getBank();

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
