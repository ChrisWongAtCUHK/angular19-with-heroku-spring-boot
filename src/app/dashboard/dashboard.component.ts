import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomerSearchComponent } from '../customer-search/customer-search.component';

@Component({
  selector: 'app-dashboard',
  imports: [NgFor, RouterLink, CustomerSearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers.slice(1, 5);
      console.log(this.customers);
    });
  }
}
