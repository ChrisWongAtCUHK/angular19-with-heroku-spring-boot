import { NgIf, UpperCasePipe, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../customer';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-detail',
  imports: [FormsModule, NgIf, UpperCasePipe],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent {
  customer: Customer | undefined;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.customerService.getCustomer(id).subscribe((customer) => (this.customer = customer));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.customer) {
      this.customerService.updateCustomer(this.customer).subscribe(() => this.goBack());
    }
  }
}
