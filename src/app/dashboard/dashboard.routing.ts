import { AuthGuard } from './../guards/auth.guard';
import { AboutComponent } from './about/about.component';
import { RegisterItemComponent } from './register-item/register-item.component';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RegisterUserComponent } from './register-user/register-user.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch:'full'},
            { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
            { path: 'registerItem', component: RegisterItemComponent},
            { path: 'registerUser', component: RegisterUserComponent, canActivate: [AuthGuard]},
            { path: 'searchUser', component: SearchUserComponent, canActivate: [AuthGuard]},
            { path: 'editUser', component: EditUserComponent, canActivate: [AuthGuard]},
            { path: 'about', component: AboutComponent }
        ]
    }
]
export const DashboardRouting: ModuleWithProviders =  RouterModule.forChild(routes);
