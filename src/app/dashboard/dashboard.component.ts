import { Component } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [NgFor, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  customers: Customer[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService
      .getCustomers()
      .subscribe((customers) => (this.customers = customers.slice(1, 5)));
  }
}
