import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { InvoicesComponent } from './invoices/invoices.component';

const routes: Routes = [
  {path: '', component: InvoicesComponent},
  {path: 'form', component: InvoiceFormComponent},
  {path: 'form/:id', component: InvoiceFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
