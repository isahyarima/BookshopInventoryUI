import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/http/guards/auth-guard.service';
import { BookComponent } from './book/book.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { PurchaseRegisterComponent } from './purchase-register/purchase-register.component';
import { AuthorComponent } from './setting/author/author.component';
import { BankComponent } from './setting/bank/bank.component';
import { CategoryComponent } from './setting/category/category.component';
import { PublisherComponent } from './setting/publisher/publisher.component';
import { StoreComponent } from './setting/store/store.component';
import { SupplierComponent } from './setting/supplier/supplier.component';

const routes: Routes = [

  {
    path: 'author', component: AuthorComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'bank', component: BankComponent, canActivate: [AuthGuardService]
  },  
  {
    path: 'category', component: CategoryComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'publisher', component: PublisherComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'store', component: StoreComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'supplier', component: SupplierComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'purchase-order', component: PurchaseOrderComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'book', component: BookComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'purchase-register', component: PurchaseRegisterComponent, canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookshopRoutingModule { }
