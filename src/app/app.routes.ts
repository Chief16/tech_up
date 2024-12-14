import { Routes } from '@angular/router';
import { ListPinsComponent } from './components/list-pins/list-pins.component';

export const routes: Routes = [
  { path: 'pins', component: ListPinsComponent },
  { path: '', redirectTo: '/pins', pathMatch: 'full' },
  { path: '**', redirectTo: '/pins' },
];
