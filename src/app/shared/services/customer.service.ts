import { Injectable } from '@angular/core';
import { CustomerI } from '../models/customer';

export class CustomerService {

  getCustomers(): CustomerI[] {
    const customers = localStorage.getItem('customers');
    return customers ? JSON.parse(customers) : [];
  }

  addCustomers(customer: CustomerI): void {
    const customers = this.getCustomers();
    customers.push(customer);
    localStorage.setItem('customers', JSON.stringify(customers));
  }
}
