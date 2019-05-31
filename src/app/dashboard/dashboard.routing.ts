import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';

const routes: Routes = [
    {
        path: '', 
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch:'full'},
            { path: 'home', loadChildren: './home/home.module#HomeModule' }
        ]
    }
]
export const DashboardRouting: ModuleWithProviders =  RouterModule.forChild(routes);
