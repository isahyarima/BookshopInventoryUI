import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BreadcrumbService } from "src/app/shared/dashboard-layout/breadcrumb.service";
import { NgxSpinnerService } from "ngx-spinner";
import { BookshopService } from "../../../bookshop.service";

@Component({
    selector: "app-publisher",
    templateUrl: "./publisher.component.html",
    styleUrls: ["./publisher.component.css"],
})
export class PublisherComponent implements OnInit {
    publisherForm: FormGroup;
    displayDataInput: boolean = false;
    displayAddModal: boolean = false;
    publisherList: any;
    publisherId: Number = 0;
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
            { label: "Publisher", routerLink: ["/publisher"] },
        ]);
    }

    ngOnInit() {
        this.IntPublisherForm();
        this.getPublisher();
    }

    newRecord() {
        this.displayDataInput = true;
        this.IntPublisherForm();
        this.publisherId = 0;
    }

    IntPublisherForm() {
        this.publisherForm = this.fb.group({
            publisherName: ["", Validators.required],
            address: ["", Validators.required],
        });
    }

    SubmitPublisher(form) {
        let data = {
            publisherId: form.value.publisherId,
            publisherName: form.value.publisherName,
            address: form.value.address,
            dateCreated: form.value.dateCreated,
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
                if (this.publisherId == 0) {
                    this.loadingService.show();
                    this.service.submitPublisher(data).subscribe(
                        (result: any) => {
                            if (result.success == true) {
                                this.getPublisher();
                                this.publisherId = 0;
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
                    this.service
                        .updatePublisher(data, this.publisherId)
                        .subscribe(
                            (result: any) => {
                                if (result.success == true) {
                                    this.getPublisher();
                                    this.publisherId = 0;
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
                this.IntPublisherForm();
                this.loadingService.hide();
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
            }
        });
    }

    getPublisher() {
        this.cols = [
            { field: "publisherName", header: "Publisher Name" },
            { field: "address", header: "Address" },
        ];
        this.loadingService.show();
        this.service.getPublisher().subscribe(
            (result: any) => {
                if (result.success == true) {
                    this.publisherList = result.response;
                    this.loadingService.hide();
                }
            },
            (error) => {}
        );
    }

    editPublisher(row) {
        this.publisherForm.patchValue({
            publisherId: row.publisherId,
            publisherName: row.publisherName,
            address: row.address,
            dateCreated: row.dateCreated,
            tenantId: row.tenantId,
        });
        this.publisherId = row.publisherId;
        this.displayDataInput = true;
    }

    deletePublisher(row) {
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
                this.service.deletePublisher(row.publisherId).subscribe(
                    (result: any) => {
                        if (result.success == true) {
                            this.getPublisher();

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
