import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BreadcrumbService } from "src/app/shared/dashboard-layout/breadcrumb.service";
import { NgxSpinnerService } from "ngx-spinner";
import { BookshopService } from "../../bookshop.service";

@Component({
    selector: "app-purchase-order",
    templateUrl: "./purchase-order.component.html",
    styleUrls: ["./purchase-order.component.css"],
})
export class PurchaseOrderComponent implements OnInit {
    purchaseOrderForm: FormGroup;
    displayDataInput: boolean = false;
    displayAddModal: boolean = false;
    purchaseOrderList: any;
    purchaseOrderId: Number = 0;
    selected: any;
    selectedCar: any;
    displayList: boolean = true;
    cols: { field: string; header: string }[];
    supplierArray: any;
    supplier: any;
    tax: any;
    taxArray: any[];
    purchaseOrderDetailList: any;
    purchaseOrderDetailForm: FormGroup;
    purchaseOrderDetailId: number = 0;
    showPurchaseOrderDetailList:boolean = false;
    showPurchaseOrderInput:boolean = false;
    rowSelected: any;
    book: any;
    bookArray: any[];
    lotNumber: string;

    constructor(
        private fb: FormBuilder,
        private loadingService: NgxSpinnerService,
        private service: BookshopService,
        private breadcrumbService: BreadcrumbService
    ) {
        this.breadcrumbService.setItems([
            { label: "Settings" },
            { label: "Purchase Order", routerLink: ["/purchaseOrder"] },
        ]);
    }

    newPurchaseOrder() {
        this.displayDataInput = true;
        this.displayList = false;
        this.IntPurchaseOrderForm();
    }

    ngOnInit() {
        this.IntPurchaseOrderForm();
        this.getPurchaseOrder();
        this.getSupplier();
        this.getTax();
        this.IntPurchaseOrderDetailForm();
       
    }

    newRecord() {
        this.displayDataInput = true;
        this.IntPurchaseOrderForm();
        this.purchaseOrderId = 0;
    }

    IntPurchaseOrderForm() {
        this.purchaseOrderForm = this.fb.group({
            orderDate: ["", Validators.required],
            supplierId: ["", Validators.required],
            orderNumber: ["ODN" + Math.floor(100000 + Math.random() * 900000), Validators.required],
            orderValidDate: ["", Validators.required],
            taxId: ["", Validators.required],
        });
    }

    addPurchaseOrderDetail(row){
        this.rowSelected = row;
        this.purchaseOrderId = row.purchaseOrderId;
        this.displayDataInput = false;
        this.displayList = false;
        this.showPurchaseOrderDetailList=true;
        this.showPurchaseOrderInput = false;
        this.getBooks();
        this.getPurchaseOrderDetail();
    }

    SubmitPurchaseOrder(form) {
        let data = {
            purchaseOrderId: form.value.purchaseOrderId,
            orderDate: form.value.orderDate,
            supplierId: form.value.supplierId,
            orderNumber: form.value.orderNumber,
            orderValidDate: form.value.orderValidDate,
            taxId: form.value.taxId,
            dateRegistered: form.value.dateRegistered,
            tenantId: form.value.tenantId,
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
                if (this.purchaseOrderId == 0) {
                    this.loadingService.show();
                    this.service.submitPurchaseOrder(data).subscribe(
                        (result: any) => {
                            if (result.success == true) {
                                this.getPurchaseOrder();
                                this.purchaseOrderId = 0;
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
                        .updatePurchaseOrder(data, this.purchaseOrderId)
                        .subscribe(
                            (result: any) => {
                                if (result.success == true) {
                                    this.getPurchaseOrder();
                                    this.purchaseOrderId = 0;
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
                this.IntPurchaseOrderForm();
                this.loadingService.hide();
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
            }
        });
    }

    getPurchaseOrder() {
        this.cols = [
            { field: "orderNumber", header: "Order Number" },
            { field: "orderDate", header: "Order Date" },
            { field: "orderValidDate", header: "Order Valid Date" },
            { field: "tax", header: "Tax" },
            { field: "supplierName", header: "Supplier" },
            { field: "status", header: "Status" },
        ];
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

    editPurchaseOrder(row) {
        this.purchaseOrderForm.patchValue({
            purchaseOrderId: row.purchaseOrderId,
            orderDate: new Date(row.orderDate),
            supplierId: row.supplierId,
            orderNumber: row.orderNumber,
            orderValidDate: new Date(row.orderValidDate),
            taxId: row.taxId,
        });
        this.purchaseOrderId = row.purchaseOrderId;
        this.displayDataInput = true;
        this.displayList = false;
    }

    deletePurchaseOrder(row) {
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
                this.service.deletePurchaseOrder(row.purchaseOrderId).subscribe(
                    (result: any) => {
                        if (result.success == true) {
                            this.getPurchaseOrder();

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

    getSupplier() {
        this.loadingService.show();
        this.service.getSupplier().subscribe((result: any) => {
            if (result.success == true) {
                this.supplier = result.response;

                this.supplierArray = [];

                this.supplierArray.push({
                    label: "Select supplier",
                    value: "",
                });
                for (let i = 0; i < this.supplier.length; i++) {
                    this.supplierArray.push({
                        label: this.supplier[i].supplierName,
                        value: this.supplier[i].supplierId,
                    });
                }
                this.loadingService.hide();
            }
        });
        //this.loadingService.hide();
    }

    getTax() {
        this.loadingService.show();
        this.service.getTax().subscribe((result: any) => {
            if (result.success == true) {
                this.tax = result.response;

                this.taxArray = [];

                this.taxArray.push({ label: "Select Tax", value: "" });
                for (let i = 0; i < this.tax.length; i++) {
                    this.taxArray.push({
                        label: this.tax[i].taxName,
                        value: this.tax[i].taxId,
                    });
                }
                this.loadingService.hide();
            }
        });
        //this.loadingService.hide();
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

    IntPurchaseOrderDetailForm() {

        

        this.purchaseOrderDetailForm = this.fb.group({
            bookId: ["", Validators.required],
            parkSize: ["", Validators.required],
            lotNumber: [this.lotNumber, Validators.required],
            quantity: ["", Validators.required],
            costPrice: ["", Validators.required],
        });
    }

    SubmitPurchaseOrderDetail(form) {
        let data = {
            purchaseOrderDetailId: form.value.purchaseOrderDetailId,
            purchaseOrderId: this.purchaseOrderId,
            bookId: form.value.bookId,
            parkSize: form.value.parkSize,
            lotNumber: form.value.lotNumber,
            quantity: form.value.quantity,
            costPrice: form.value.costPrice,
          
          
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
                if (this.purchaseOrderDetailId == 0) {
                    this.loadingService.show();
                    this.service.submitPurchaseOrderDetail(data).subscribe(
                        (result: any) => {
                            if (result.success == true) {
                                this.getPurchaseOrderDetail();
                                this.purchaseOrderDetailId = 0;
                                this.showPurchaseOrderInput = true;
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
                        .updatePurchaseOrderDetail(
                            data,
                            this.purchaseOrderDetailId
                        )
                        .subscribe(
                            (result: any) => {
                                if (result.success == true) {
                                    this.getPurchaseOrderDetail();
                                    this.purchaseOrderDetailId = 0;
                                    this.showPurchaseOrderInput = true;
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
                this.IntPurchaseOrderDetailForm();
                this.loadingService.hide();
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
            }
        });
    }

    getPurchaseOrderDetail() {
        this.cols = [
            { field: "lotNumber", header: "Lot Number" },
            { field: "bookTitle", header: "Book" },
            { field: "parkSize", header: "Park Size" },
            { field: "quantity", header: "Quantity" },
            { field: "costPrice", header: "Cost Price" },
            { field: "status", header: "Status" },
        ];
        this.loadingService.show();
        this.service.getPurchaseOrderDetail(this.purchaseOrderId).subscribe(
            (result: any) => {
                if (result.success == true) {
                    this.purchaseOrderDetailList = result.response;
                    this.loadingService.hide();
                    if(this.purchaseOrderDetailList.length > 0){
                        this.lotNumber = this.purchaseOrderDetailList[0].lotNumber;
                        this.purchaseOrderDetailForm.controls["lotNumber"].setValue(this.lotNumber);
                    }else{
                        this.lotNumber = "LOT"+Math.floor(100000 + Math.random() * 900000);
                        this.purchaseOrderDetailForm.controls["lotNumber"].setValue(this.lotNumber);
                    }
                }
            },
            (error) => {}
        );
    }

    editPurchaseOrderDetail(row) {
        this.purchaseOrderDetailForm.patchValue({
            purchaseOrderDetailId: row.purchaseOrderDetailId,
            purchaseOrderId: row.purchaseOrderId,
            bookId: row.bookId,
            parkSize: row.parkSize,
            lotNumber: row.lotNumber,
            quantity: row.quantity,
            costPrice: row.costPrice,
            dateRegistered: row.dateRegistered,
            tenantId: row.tenantId,
            createdBy: row.createdBy,
        });
        this.purchaseOrderDetailId = row.purchaseOrderDetailId;
        this.displayDataInput = false;
        this.displayList = false;
        this.showPurchaseOrderDetailList=true;
        this.showPurchaseOrderInput = true;
    }

    deletePurchaseOrderDetail(row) {
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
                    .deletePurchaseOrderDetail(row.purchaseOrderDetailId)
                    .subscribe(
                        (result: any) => {
                            if (result.success == true) {
                                this.getPurchaseOrderDetail();

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

/*

*/
