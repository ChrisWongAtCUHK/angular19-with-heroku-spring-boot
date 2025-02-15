import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-search',
  imports: [NgFor, RouterLink, CommonModule],
  templateUrl: './customer-search.component.html',
  styleUrl: './customer-search.component.css'
})
export class CustomerSearchComponent {
  customers$!: Observable<Customer[]>;
  private searchNames = new Subject<string>();

  constructor(private customerService: CustomerService) {}

  // Push a search name into the observable stream.
  search(name: string): void {
    this.searchNames.next(name);
  }

  ngOnInit(): void {
    this.customers$ = this.searchNames.pipe(
      // wait 300ms after each keystroke before considering the name
      debounceTime(300),

      // ignore new name if same as previous name
      distinctUntilChanged(),

      // switch to new search observable each time the name changes
      switchMap((name: string) => this.customerService.searchCustomers(name)),
    );
  }
}
