import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';

const routes: Routes = [
    { path: '', component: LoginComponent }
];

export const LoginRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);