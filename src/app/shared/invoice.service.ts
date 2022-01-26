import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  public static readonly API = 'http://localhost:8080'

  constructor(private httpClient : HttpClient) { }

  public getInvoices(): Observable<Invoice[]> {
    return this.httpClient.get<Invoice[]>(`${InvoiceService.API}/api/v1/invoices/`);
  }

  public getInvoice(id: string): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${InvoiceService.API}/api/v1/invoices/${id}`);
  }

  public saveInvoice(invoice: Invoice): Observable<Invoice> {
    return this.httpClient.post<Invoice>(`${InvoiceService.API}/api/v1/invoices/`, invoice);
  }

  public deleteInvoice(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${InvoiceService.API}/api/v1/invoices/${id}`);
  }

}
