import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BreadcrumbService } from "src/app/shared/dashboard-layout/breadcrumb.service";
import { NgxSpinnerService } from "ngx-spinner";
import { BookshopService } from "../../bookshop.service";

@Component({
    selector: "app-purchase-register",
    templateUrl: "./purchase-register.component.html",
    styleUrls: ["./purchase-register.component.css"],
})
export class PurchaseRegisterComponent implements OnInit {
    purchaseReceiptRegisterDetailForm: FormGroup;
    displayDataInput: boolean = false;
    displayAddModal: boolean = false;
    purchaseReceiptRegisterDetailList: any;
    purchaseReceiptRegisterDetailId: Number = 0;
    selected: any;
    selectedCar: any;
    displayList: boolean = true;
    cols: { field: string; header: string }[];
  book: any;
  bookArray: any[];
  store: any;
  storeArray: any[];
  supplyStatus: any;
  supplyStatusArray: any[];
  showPurchaseOrderInput:any;
  purchaseOrderList:any;
  purchaseOrderDetailList:any;
  showPurchaseOrder : boolean=false;
  showOrderDetail : boolean = false;
  orderDate:any;
  isAvailable: boolean =false;

    constructor(
        private fb: FormBuilder,
        private loadingService: NgxSpinnerService,
        private service: BookshopService,
        private breadcrumbService: BreadcrumbService
    ) {
        this.breadcrumbService.setItems([
            { label: "Settings" },
            {
                label: "Purchase Receipt Register",
                routerLink: ["/purchaseReceiptRegisterDetail"],
            },
        ]);
    }

    newPurchaseReceiptRegisterDetail() {
        this.displayDataInput = true;
        this.displayList = false;
    }

    ngOnInit() {
        this.IntPurchaseReceiptRegisterDetailForm();
        this.getPurchaseReceiptRegisterDetail();
        this.getBooks();
        this.getStore();
        this.getDelveryStatus();
    }

    enablePurchaseOrder(){
      this.showPurchaseOrder = true;
      this.showPurchaseOrderInput = true;
      this.showPurchaseOrder = true;
      this.showOrderDetail = false;
      this. getPurchaseOrder();
    }



    newRecord() {
        this.displayDataInput = true;
        this.IntPurchaseReceiptRegisterDetailForm();
        this.purchaseReceiptRegisterDetailId = 0;
    }

    IntPurchaseReceiptRegisterDetailForm() {
        this.purchaseReceiptRegisterDetailForm = this.fb.group({
            purchaseReceiptRegisterId: ["", Validators.required],
            bookId: ["", Validators.required],
            parkSize: ["", Validators.required],
            lotNumber: ["LOT"+Math.floor(100000 + Math.random() * 900000), Validators.required],
            quantity: ["", Validators.required],
            purchaseRate: ["", Validators.required],
            saleRate: ["", Validators.required],
            supplyStatusId: ["", Validators.required],
            storeId: ["", Validators.required],
            minQuantityToAlert: ["", Validators.required],
            // isAvailable: [""],
        });
    }

    getPurchaseOrder() {
      this.loadingService.show();
      this.service.getPurchaseOrder().subscribe(
          (result: any) => {
              if (result.success == true) {
                  this.purchaseOrderList = result.response;
                  this.loadingService.hide();
              }
          },
          (error) => {}
      );
  }


  getPurchaseOrderDetail(doc){
    this.loadingService.show();
        this.service.getPurchaseOrderDetail(doc.purchaseOrderId).subscribe(
            (result: any) => {
                if (result.success == true) {
                    this.purchaseOrderDetailList = result.response;
                    this.loadingService.hide();

                    this.showPurchaseOrder = false;
                    this.showOrderDetail = true;
                }
            },
            (error) => {}
        );
  }

  mapPurchaseRegister(row){


    this.purchaseReceiptRegisterDetailForm.patchValue({
      purchaseReceiptRegisterDetailId:
          row.purchaseReceiptRegisterDetailId,
      purchaseReceiptRegisterId: row.purchaseReceiptRegisterId,
      bookId: row.bookId,
      parkSize: row.parkSize,
      lotNumber: row.lotNumber,
      quantity: row.quantity,
      purchaseRate: +(row.costPrice/row.parkSize),
      saleRate: row.saleRate,
      supplyStatusId: row.supplyStatusId,
      storeId: row.storeId,
      minQuantityToAlert: row.minQuantityToAlert,
      tenantId: row.tenantId,
      dateRegistered: row.dateRegistered,
      isAvailable: row.isAvailable,
      createdBy: row.createdBy,
  });

  this.showPurchaseOrderInput = false;

  }


  isAvailableOption(isChecked: boolean) {

    if (isChecked == true) {
      this.isAvailable = true;
    } else {
      this.isAvailable = false;
    }
  }

  searchPurchaseOrder() {
    let data = {
      orderDate : this.orderDate
    }
    this.loadingService.show();
    this.service.searchPurchaseOrder(data).subscribe(
        (result: any) => {
            if (result.success == true) {
                this.purchaseOrderList = result.response;
                this.loadingService.hide();
            }
        },
        (error) => {}
    );
}

    SubmitPurchaseReceiptRegisterDetail(form) {
        let data = {
            purchaseReceiptRegisterDetailId:
                form.value.purchaseReceiptRegisterDetailId,
            purchaseReceiptRegisterId: form.value.purchaseReceiptRegisterId,
            bookId: form.value.bookId,
            parkSize: form.value.parkSize,
            lotNumber: form.value.lotNumber,
            quantity: form.value.quantity,
            purchaseRate: form.value.purchaseRate,
            saleRate: form.value.saleRate,
            supplyStatusId: form.value.supplyStatusId,
            storeId: form.value.storeId,
            minQuantityToAlert: form.value.minQuantityToAlert,
            tenantId: form.value.tenantId,
            dateRegistered: form.value.dateRegistered,
            isAvailable: this.isAvailable,
            createdBy: form.value.createdBy,
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
                if (this.purchaseReceiptRegisterDetailId == 0) {
                    this.loadingService.show();
                    this.service
                        .submitPurchaseReceiptRegisterDetail(data)
                        .subscribe(
                            (result: any) => {
                                if (result.success == true) {
                                    this.getPurchaseReceiptRegisterDetail();
                                    this.purchaseReceiptRegisterDetailId = 0;
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
                        .updatePurchaseReceiptRegisterDetail(
                            data,
                            this.purchaseReceiptRegisterDetailId
                        )
                        .subscribe(
                            (result: any) => {
                                if (result.success == true) {
                                    this.getPurchaseReceiptRegisterDetail();
                                    this.purchaseReceiptRegisterDetailId = 0;
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
                this.IntPurchaseReceiptRegisterDetailForm();
                this.loadingService.hide();
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
            }
        });
    }

    getPurchaseReceiptRegisterDetail() {
        this.cols = [
          { field: "lotNumber", header: "Lot Number" },
            { field: "bookTitle", header: "Book" },
            { field: "parkSize", header: "Park Size" },
            { field: "quantity", header: "Quantity" },
            { field: "purchaseRate", header: "Purchase Rate" },
            { field: "saleRate", header: "Sale Rate" },
            { field: "minQuantityToAlert", header: "Min Quantity To Alert" },
            { field: "isAvailable", header: "Is Available" },
        ];
        this.loadingService.show();
        this.service.getPurchaseReceiptRegisterDetail().subscribe(
            (result: any) => {
                if (result.success == true) {
                    this.purchaseReceiptRegisterDetailList = result.response;
                    this.loadingService.hide();
                }
            },
            (error) => {}
        );
    }


    getBooks() {
      this.loadingService.show();
      this.service.getBook().subscribe((result: any) => {
          if (result.success == true) {
              this.book = result.response;

              this.bookArray = [];

              this.bookArray.push({ label: "Select Book", value: "" });
              for (let i = 0; i < this.book.length; i++) {
                  this.bookArray.push({
                      label: this.book[i].bookTitle,
                      value: this.book[i].bookId,
                  });
              }
              this.loadingService.hide();
          }
      });
      //this.loadingService.hide();
  }

  getDelveryStatus() {
    this.loadingService.show();
    this.service.getSupplyStatus().subscribe((result: any) => {
        if (result.success == true) {
            this.supplyStatus = result.response;
            this.supplyStatusArray = [];
            this.supplyStatusArray.push({ label: "Select Status", value: "" });
            for (let i = 0; i < this.supplyStatus.length; i++) {
                this.supplyStatusArray.push({
                    label: this.supplyStatus[i].supplyStatusName,
                    value: this.supplyStatus[i].supplyStatusId,
                });
            }
            this.loadingService.hide();
        }
    });
}

  getStore() {
    this.loadingService.show();
    this.service.getStore().subscribe((result: any) => {
        if (result.success == true) {
            this.store = result.response;

            this.storeArray = [];

            this.storeArray.push({ label: "Select Store", value: "" });
            for (let i = 0; i < this.store.length; i++) {
                this.storeArray.push({
                    label: this.store[i].storeName,
                    value: this.store[i].storeId,
                });
            }
            this.loadingService.hide();
        }
    });
    //this.loadingService.hide();
}
    editPurchaseReceiptRegisterDetail(row) {
        this.purchaseReceiptRegisterDetailForm.patchValue({
            purchaseReceiptRegisterDetailId:
                row.purchaseReceiptRegisterDetailId,
            purchaseReceiptRegisterId: row.purchaseReceiptRegisterId,
            bookId: row.bookId,
            parkSize: row.parkSize,
            lotNumber: row.lotNumber,
            quantity: row.quantity,
            purchaseRate: row.purchaseRate,
            saleRate: row.saleRate,
            supplyStatusId: row.supplyStatusId,
            storeId: row.storeId,
            minQuantityToAlert: row.minQuantityToAlert,
            tenantId: row.tenantId,
            dateRegistered: row.dateRegistered,
            isAvailable: row.isAvailable,
            createdBy: row.createdBy,
        });
        this.purchaseReceiptRegisterDetailId =
            row.purchaseReceiptRegisterDetailId;
        this.displayDataInput = true;
        this.displayList = false;
    }


    backToList(){
      this.displayList = true; this.displayDataInput = false;
      this.IntPurchaseReceiptRegisterDetailForm();
    }
    deletePurchaseReceiptRegisterDetail(row) {
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
                this.service
                    .deletePurchaseReceiptRegisterDetail(
                        row.purchaseReceiptRegisterDetailId
                    )
                    .subscribe(
                        (result: any) => {
                            if (result.success == true) {
                                this.getPurchaseReceiptRegisterDetail();

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
