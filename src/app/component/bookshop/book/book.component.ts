import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BreadcrumbService } from "src/app/shared/dashboard-layout/breadcrumb.service";
import { NgxSpinnerService } from "ngx-spinner";
import { BookshopService } from "../../bookshop.service";

@Component({
    selector: "app-book",
    templateUrl: "./book.component.html",
    styleUrls: ["./book.component.css"],
})
export class BookComponent implements OnInit {
    bookForm: FormGroup;
    displayDataInput: boolean = false;
    displayAddModal: boolean = false;
    bookList: any;
    bookId: Number = 0;
    selected: any;
    selectedCar: any;
    displayList: boolean = true;
    cols: { field: string; header: string }[];
  category: any;
  categorysArray: any[];
  publishers: any[];
  publisher: any;
  publisherArray: any[];

    constructor(
        private fb: FormBuilder,
        private loadingService: NgxSpinnerService,
        private service: BookshopService,
        private breadcrumbService: BreadcrumbService
    ) {
        this.breadcrumbService.setItems([
            { label: "Settings" },
            { label: "Book", routerLink: ["/book"] },
        ]);
    }

    newBook() {
        this.displayDataInput = true;
        this.displayList = false;
        this.IntBookForm();
        this.bookId = 0;
    }

    ngOnInit() {
        this.IntBookForm();
        this.getBook();
        this.getCategory();
        this.getPublisher();

        this.publishers = [];
        this.publishers.push({ label: 'Select Edition', value: '' });
        this.publishers.push({ label: "1st Edition", value: '1st Edition' });
        this.publishers.push({ label: "2nd Edition", value: '2nd Edition' });
        this.publishers.push({ label: "3th Edition", value: '3th Edition' });
        this.publishers.push({ label: "4th Edition", value: '4th Edition' });
        this.publishers.push({ label: "5th Edition", value: '5th Edition' });
        this.publishers.push({ label: "6th Edition", value: '6th Edition' });
        this.publishers.push({ label: "7th Edition", value: '7th Edition' });
        this.publishers.push({ label: "8th Edition", value: '8th Edition' });
        this.publishers.push({ label: "9th Edition", value: '9th Edition' });
        this.publishers.push({ label: "10th Edition", value: '10th Edition' });
        this.publishers.push({ label: "11th Edition", value: '11th Edition' });
        this.publishers.push({ label: "12th Edition", value: '12th Edition' });
        this.publishers.push({ label: "13th Edition", value: '13th Edition' });
        this.publishers.push({ label: "14th Edition", value: '14th Edition' });
        this.publishers.push({ label: "15th Edition", value: '15th Edition' });
        this.publishers.push({ label: "16th Edition", value: '16th Edition' });
        this.publishers.push({ label: "17th Edition", value: '17th Edition' });
        this.publishers.push({ label: "18th Edition", value: '18th Edition' });
        this.publishers.push({ label: "19th Edition", value: '19th Edition' });
        this.publishers.push({ label: "20th Edition", value: '20th Edition' });

        console.log(Math.floor(100000 + Math.random() * 900000));
    }

    newRecord() {
        this.displayDataInput = true;
        this.IntBookForm();
        this.bookId = 0;
    }

    getCategory() {
      this.loadingService.show();
    this.service.getCategory().subscribe((result: any) => {
      if (result.success == true) {
        this.category = result.response;
        this.categorysArray = [];
        this.categorysArray.push({ label: 'Select Category', value: '' });
        for (let i = 0; i < this.category.length; i++) {
          this.categorysArray.push({ label: this.category[i].categoryName, value: this.category[i].categoryId });
        }
        this.loadingService.hide();
      }
    })
    this.loadingService.hide();
  }

  getPublisher() {
    this.loadingService.show();
  this.service.getPublisher().subscribe((result: any) => {
    if (result.success == true) {
      this.publisher = result.response;
      this.publisherArray = [];
      this.publisherArray.push({ label: 'Select Publisher', value: '' });
      for (let i = 0; i < this.publisher.length; i++) {
        this.publisherArray.push({ label: this.publisher[i].publisherName, value: this.publisher[i].publisherId });
      }
      this.loadingService.hide();
    }
  })
  this.loadingService.hide();
}

    IntBookForm() {
        this.bookForm = this.fb.group({
            bookTitle: ["", Validators.required],
            totalPage: ["", Validators.required],
            yearOfPublish: ["", Validators.required],
            edition: ["", Validators.required],
            publisherId: ["", Validators.required],
            categoryId: ["", Validators.required],
            language: ["English Language", Validators.required],
            description: [""],
            barcode: [Math.floor(100000000 + Math.random() * 900000000), Validators.required],
        });
    }

    SubmitBook(form) {
        let data = {
            bookId: form.value.bookId,
            bookTitle: form.value.bookTitle,
            totalPage: form.value.totalPage,
            yearOfPublish: form.value.yearOfPublish,
            edition: form.value.edition,
            publisherId: form.value.publisherId,
            uRL: form.value.uRL,
            categoryId: form.value.categoryId,
            language: form.value.language,
            description: form.value.description,
            barcode: form.value.barcode,
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
                if (this.bookId == 0) {
                    this.loadingService.show();
                    this.service.submitBook(data).subscribe(
                        (result: any) => {
                            if (result.success == true) {
                                this.getBook();
                                this.bookId = 0;
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
                    this.service.updateBook(data, this.bookId).subscribe(
                        (result: any) => {
                            if (result.success == true) {
                                this.getBook();
                                this.bookId = 0;
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
                this.IntBookForm();
                this.loadingService.hide();
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
            }
        });
    }

    getBook() {
        this.cols = [
          { field: "categoryName", header: "Category" },
            { field: "bookTitle", header: "Book Title" },
            { field: "edition", header: "Edition" },
            { field: "publisherName", header: "Publisher" },
            { field: "totalPage", header: "Total Page" },
            { field: "yearOfPublish", header: "Year Of Publish" },
            { field: "barcode", header: "Barcode" },
        ];
        this.loadingService.show();
        this.service.getBook().subscribe(
            (result: any) => {
                if (result.success == true) {
                    this.bookList = result.response;
                    this.loadingService.hide();
                }
            },
            (error) => {}
        );
    }

    editBook(row) {
        this.bookForm.patchValue({
            bookId: row.bookId,
            bookTitle: row.bookTitle,
            totalPage: row.totalPage,
            yearOfPublish: row.yearOfPublish,
            edition: row.edition,
            publisherId: row.publisherId,
            uRL: row.uRL,
            categoryId: row.categoryId,
            language: row.language,
            description: row.description,
            barcode: row.barcode,
            dateCreated: row.dateCreated,
            tenantId: row.tenantId,
        });
        this.bookId = row.bookId;
        this.displayDataInput = true;
        this.displayList = false;
    }

    deleteBook(row) {
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
                this.service.deleteBook(row.bookId).subscribe(
                    (result: any) => {
                        if (result.success == true) {
                            this.getBook();

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


