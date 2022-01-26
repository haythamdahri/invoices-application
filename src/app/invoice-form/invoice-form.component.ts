import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Invoice } from '../models/invoice';
import { InvoiceService } from '../shared/invoice.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit, OnDestroy {

  invoiceForm!: FormGroup;
  routeSubscription!: Subscription;
  invoiceSubscription!: Subscription;
  invoiceSaveSubscription!: Subscription;

  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService, private router: Router) { }

  ngOnInit(): void {
    this.invoiceForm = new FormGroup({
      'id': new FormControl('', [Validators.required]),
      'amount': new FormControl('', [Validators.required]),
      'vatAmount': new FormControl('', [Validators.required]),
      'invoiceDate': new FormControl('', [Validators.required]),
    });
    this.routeSubscription = this.route.params.subscribe(
      (params: Params) => {
        if( params['id'] ) {
          this.fetchInvoice(params['id']);
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.invoiceSubscription?.unsubscribe();
    this.invoiceSaveSubscription?.unsubscribe();
  }

  fetchInvoice(id: string) {
      this.invoiceSubscription = this.invoiceService.getInvoice(id).subscribe(
        (invoice: Invoice) => {
          this.invoiceForm.patchValue({'id': invoice.id, 'amount': invoice.amount, 'vatAmount': invoice.vatAmount, 'invoiceDate': invoice.invoiceDate});
        }
      );
  }

  onInvoiceSave() {
    this.invoiceForm.patchValue({'invoiceDate': new Date()})
    this.invoiceSaveSubscription = this.invoiceService.saveInvoice(this.invoiceForm.value).subscribe(
      () => this.router.navigateByUrl('/')
    );
  }

}
