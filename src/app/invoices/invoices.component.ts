import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Invoice } from '../models/invoice';
import { InvoiceService } from '../shared/invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit, OnDestroy {

  invoices: Array<Invoice> = [];
  private invoicesSubscriptions!: Subscription;
  private invoiceDeleteSubscriptions!: Subscription;

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.invoicesSubscriptions?.unsubscribe();
    this.invoiceDeleteSubscriptions?.unsubscribe();
  }

  fetchData() {
    this.invoicesSubscriptions = this.invoiceService.getInvoices().subscribe(
      (invoices) => this.invoices = invoices
    );
  }

  deleteInvoice(id: string) {
    this.invoiceDeleteSubscriptions = this.invoiceService.deleteInvoice(id).subscribe(
      () => this.fetchData()
    );
  }

}
