import { Routes } from '@angular/router';
import { ListPinsComponent } from './components/list-pins/list-pins.component';
import { ListCustomersComponent } from './components/list-customers/list-customers.component';

export const routes: Routes = [
  { path: 'pins', component: ListPinsComponent },
  { path: 'customers', component: ListCustomersComponent },
  { path: '', redirectTo: '/pins', pathMatch: 'full' },
  { path: '**', redirectTo: '/pins' },
];
