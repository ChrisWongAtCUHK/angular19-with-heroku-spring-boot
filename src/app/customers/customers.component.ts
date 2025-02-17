import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-customers',
  imports: [FormsModule, NgFor, RouterLink],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent {
  customers: Customer[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getcustomers();
  }

  getcustomers(): void {
    this.customerService
      .getCustomers()
      .subscribe((customers) => (this.customers = customers));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.customerService
      .addCustomer(name)
      .subscribe((customer) => {
        this.customers.push(customer);
      });
  }

  delete(customer: Customer): void {
    this.customers = this.customers.filter((h) => h !== customer);
    this.customerService
      .deleteCustomer(customer.id)
      .subscribe((customer) => {});
  }
}
