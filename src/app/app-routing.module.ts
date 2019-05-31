import { AppComponent } from './app.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AppComponent, 
    children: [
      { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'login', loadChildren: './login/login.module#LoginModule' }
    ]
  }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});