import { HomeModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRouting} from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { HeadComponent } from './head/head.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRouting,
    HomeModule
  ],
  declarations: [ DashboardComponent, HeadComponent, MenuLateralComponent ]
})
export class DashboardModule { }
