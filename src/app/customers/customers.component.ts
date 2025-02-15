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
      .addCustomer({ name } as Customer)
      .subscribe((Customer) => {
        this.customers.push(Customer);
      });
  }

  delete(Customer: Customer): void {
    this.customers = this.customers.filter((h) => h !== Customer);
  }
}
