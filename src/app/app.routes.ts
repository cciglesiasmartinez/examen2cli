import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { New } from './pages/new/new';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'new', component: New },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
