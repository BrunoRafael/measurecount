import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';

const routes: Routes = [
    {
        path: '', 
        component: DashboardComponent,
        children: [
            { path: '', redirectTo:'/home', pathMatch:'full'},
            { path: 'home', component: HomeComponent }
        ]
    }
]
export const DashboardRouting: ModuleWithProviders =  RouterModule.forChild(routes);
