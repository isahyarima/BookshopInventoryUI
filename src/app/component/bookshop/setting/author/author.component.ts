import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BreadcrumbService } from "src/app/shared/dashboard-layout/breadcrumb.service";
import { NgxSpinnerService } from "ngx-spinner";
import { BookshopService } from "../../../bookshop.service";

@Component({
    selector: "app-author",
    templateUrl: "./author.component.html",
    styleUrls: ["./author.component.css"],
})
export class AuthorComponent implements OnInit {
    authorForm: FormGroup;
    displayDataInput: boolean = false;
    displayAddModal: boolean = false;
    authorList: any;
    authorId: Number = 0;
    selected: any;
    selectedCar: any;
    displayList: boolean = true;
    cols: { field: string; header: string }[];

    constructor(
        private fb: FormBuilder,
        private loadingService: NgxSpinnerService,
        private service: BookshopService,
        private breadcrumbService: BreadcrumbService
    ) {
        this.breadcrumbService.setItems([
            { label: "Settings" },
            { label: "Author", routerLink: ["/author"] },
        ]);
    }

    newAuthor() {
        this.displayDataInput = true;
        this.displayList = false;
    }

    ngOnInit() {
        this.IntAuthorForm();
        this.getAuthor();
    }

    newRecord() {
        this.displayDataInput = true;
        this.IntAuthorForm();
        this.authorId = 0;
    }

    IntAuthorForm() {
        this.authorForm = this.fb.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            dateOfBirth: [""],
            bioURL: [""],
            phoneNumber: [""],
            emailAddress: [""],
            city: [""],
            state: [""],
            country: [""],
        });
    }

    SubmitAuthor(form) {
        let data = {
            authorId: form.value.authorId,
            firstName: form.value.firstName,
            lastName: form.value.lastName,
            dateOfBirth: form.value.dateOfBirth,
            bioURL: form.value.bioURL,
            initial: form.value.initial,
            contact: form.value.contact,
            phoneNumber: form.value.phoneNumber,
            emailAddress: form.value.emailAddress,
            city: form.value.city,
            state: form.value.state,
            countryId: form.value.countryId,
            stateId: form.value.stateId,
            localGovtId: form.value.localGovtId,
            country: form.value.country,
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
                if (this.authorId == 0) {
                    this.loadingService.show();
                    this.service.submitAuthor(data).subscribe(
                        (result: any) => {
                            if (result.success == true) {
                                this.getAuthor();
                                this.authorId = 0;
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
                    this.service.updateAuthor(data, this.authorId).subscribe(
                        (result: any) => {
                            if (result.success == true) {
                                this.getAuthor();
                                this.authorId = 0;
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
                this.IntAuthorForm();
                this.loadingService.hide();
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
            }
        });
    }

    getAuthor() {
        this.cols = [
            { field: "name", header: " Name" },
            { field: "phoneNumber", header: "Phone Number" },
            { field: "emailAddress", header: "Email Address" },
            { field: "city", header: "City" },
            { field: "state", header: "State" },
            { field: "country", header: "Country" },
        ];
        this.loadingService.show();
        this.service.getAuthor().subscribe(
            (result: any) => {
                if (result.success == true) {
                    this.authorList = result.response;
                    this.loadingService.hide();
                }
            },
            (error) => {}
        );
    }

    editAuthor(row) {
        this.authorForm.patchValue({
            authorId: row.authorId,
            firstName: row.firstName,
            lastName: row.lastName,
            dateOfBirth: row.dateOfBirth,
            bioURL: row.bioURL,
            initial: row.initial,
            contact: row.contact,
            phoneNumber: row.phoneNumber,
            emailAddress: row.emailAddress,
            city: row.city,
            state: row.state,
            countryId: row.countryId,
            stateId: row.stateId,
            localGovtId: row.localGovtId,
            country: row.country,
            dateCreated: row.dateCreated,
            tenantId: row.tenantId,
        });
        this.authorId = row.authorId;
        this.displayDataInput = true;
        this.displayList = true;
    }

    deleteAuthor(row) {
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
                this.service.deleteAuthor(row.authorId).subscribe(
                    (result: any) => {
                        if (result.success == true) {
                            this.getAuthor();

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
