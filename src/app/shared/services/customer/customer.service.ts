import { Injectable } from '@angular/core';
import { CustomerI } from '../../models/customer';

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

  deleteCustomer(title: string): void {
    const customers = this.getCustomers();
    const filteredCustomers = customers.filter(c => c.title !== title);
    localStorage.setItem('customers', JSON.stringify(filteredCustomers));
  }

  updateCustomer(updatedCustomer: CustomerI): void {
    const customers = this.getCustomers();
    const index = customers.findIndex(c => c.title === updatedCustomer.title);
    customers[index] = updatedCustomer;
    localStorage.setItem('customers', JSON.stringify(customers));
  }

  checkIfCustomerExists(name: string): boolean {
    const customers = this.getCustomers();
    return !!customers.find(c => c.title === name);
  }
}
