import { Routes } from '@angular/router';
import { ListPinsComponent } from './components/list-pins/list-pins.component';
import { ListCustomersComponent } from './components/list-customers/list-customers.component';

export const routes: Routes = [
  { path: 'pins', component: ListPinsComponent },
  { path: 'customers', loadComponent:() => import('./components/list-customers/list-customers.component').then(m => m.ListCustomersComponent) },
  { path: '', redirectTo: '/pins', pathMatch: 'full' },
  { path: '**', redirectTo: '/pins' },
];
