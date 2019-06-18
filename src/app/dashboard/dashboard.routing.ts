import { AboutComponent } from './about/about.component';
import { RegisterItemComponent } from './register-item/register-item.component';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RegisterUserComponent } from './register-user/register-user.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch:'full'},
            { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
            { path: 'registerItem', component: RegisterItemComponent},
            { path: 'registerUser', component: RegisterUserComponent},
            { path: 'about', component: AboutComponent }
        ]
    }
]
export const DashboardRouting: ModuleWithProviders =  RouterModule.forChild(routes);
