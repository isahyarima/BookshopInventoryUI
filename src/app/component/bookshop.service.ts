import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookshopService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  submitCategory(data) {
    return this.http.post(this.baseUrl + `category`,data);
  }
  getCategory() {
    return this.http.get(this.baseUrl + `category`);
  }
  deleteCategory(categoryId) {
    return this.http.delete(this.baseUrl + `category/${categoryId}/categoryId`);
  }
  updateCategory(data,categoryId) {
    return this.http.put(this.baseUrl + `category/${categoryId}/categoryId`, data);
  }


  submitBank(data) {
    return this.http.post(this.baseUrl + `bank`,data);
  }
  getBank() {
    return this.http.get(this.baseUrl + `bank`);
  }
  deleteBank(bankId) {
    return this.http.delete(this.baseUrl + `bank/${bankId}/bankId`);
  }
  updateBank(data,bankId) {
    return this.http.put(this.baseUrl + `bank/${bankId}/bankId`, data);
  }


  submitAuthor(data) {
    return this.http.post(this.baseUrl + `author`,data);
  }
  getAuthor() {
    return this.http.get(this.baseUrl + `author`);
  }
  deleteAuthor(authorId) {
    return this.http.delete(this.baseUrl + `author/${authorId}/authorId`);
  }
  updateAuthor(data,authorId) {
    return this.http.put(this.baseUrl + `author/${authorId}/authorId`, data);
  }



  submitPublisher(data) {
    return this.http.post(this.baseUrl + `publisher`,data);
  }
  getPublisher() {
    return this.http.get(this.baseUrl + `publisher`);
  }
  deletePublisher(publisherId) {
    return this.http.delete(this.baseUrl + `publisher/${publisherId}/publisherId`);
  }
  updatePublisher(data,publisherId) {
    return this.http.put(this.baseUrl + `publisher/${publisherId}/publisherId`, data);
  }


  submitStore(data) {
    return this.http.post(this.baseUrl + `store`,data);
  }
  getStore() {
    return this.http.get(this.baseUrl + `store`);
  }
  deleteStore(storeId) {
    return this.http.delete(this.baseUrl + `store/${storeId}/storeId`);
  }
  updateStore(data,storeId) {
    return this.http.put(this.baseUrl + `store/${storeId}/storeId`, data);
  }


  submitSupplier(data) {
    return this.http.post(this.baseUrl + `supplier`,data);
  }
  getSupplier() {
    return this.http.get(this.baseUrl + `supplier`);
  }
  deleteSupplier(supplierId) {
    return this.http.delete(this.baseUrl + `supplier/${supplierId}/supplierId`);
  }
  updateSupplier(data,supplierId) {
    return this.http.put(this.baseUrl + `supplier/${supplierId}/supplierId`, data);
  }

  submitPurchaseOrder(data) {
    return this.http.post(this.baseUrl + `purchaseOrder`,data);
  }

  searchPurchaseOrder(data) {
    return this.http.post(this.baseUrl + `purchaseOrder/search`,data);
  }

  getPurchaseOrder() {
    return this.http.get(this.baseUrl + `purchaseOrder`);
  }
  deletePurchaseOrder(purchaseOrderId) {
    return this.http.delete(this.baseUrl + `purchaseOrder/${purchaseOrderId}/purchaseOrderId`);
  }
  updatePurchaseOrder(data,purchaseOrderId) {
    return this.http.put(this.baseUrl + `purchaseOrder/${purchaseOrderId}/purchaseOrderId`, data);
  }



  getTax() {
    return this.http.get(this.baseUrl + `tax`);
  }



  submitPurchaseOrderDetail(data) {
    return this.http.post(this.baseUrl + `purchaseOrderDetail`,data);
  }
  getPurchaseOrderDetail(purchaseOrderId) {
    return this.http.get(this.baseUrl + `purchaseOrderDetail/${purchaseOrderId}/purchaseOrderId`);
  }
  deletePurchaseOrderDetail(purchaseOrderDetailId) {
    return this.http.delete(this.baseUrl + `purchaseOrderDetail/${purchaseOrderDetailId}/purchaseOrderDetailId`);
  }
  updatePurchaseOrderDetail(data,purchaseOrderDetailId) {
    return this.http.put(this.baseUrl + `purchaseOrderDetail/${purchaseOrderDetailId}/purchaseOrderDetailId`, data);
  }

  submitBook(data) {
    return this.http.post(this.baseUrl + `book`,data);
  }
  getBook() {
    return this.http.get(this.baseUrl + `book`);
  }

  deleteBook(bookId) {
    return this.http.delete(this.baseUrl + `book/${bookId}/bookId`);
  }
  updateBook(data,bookId) {
    return this.http.put(this.baseUrl + `book/${bookId}/bookId`, data);
  }
  


  submitPurchaseReceiptRegisterDetail(data) {
    return this.http.post(this.baseUrl + `purchaseReceiptRegisterDetail`,data);
  }
  getPurchaseReceiptRegisterDetail() {
    return this.http.get(this.baseUrl + `purchaseReceiptRegisterDetail`);
  }
  deletePurchaseReceiptRegisterDetail(purchaseReceiptRegisterDetailId) {
    return this.http.delete(this.baseUrl + `purchaseReceiptRegisterDetail/${purchaseReceiptRegisterDetailId}/purchaseReceiptRegisterDetailId`);
  }
  updatePurchaseReceiptRegisterDetail(data,purchaseReceiptRegisterDetailId) {
    return this.http.put(this.baseUrl + `purchaseReceiptRegisterDetail/${purchaseReceiptRegisterDetailId}/purchaseReceiptRegisterDetailId`, data);
  }
  getSupplyStatus() {
    return this.http.get(this.baseUrl + `supplyStatus`);
  }
}
