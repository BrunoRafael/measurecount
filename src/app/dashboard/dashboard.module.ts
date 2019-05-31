import { HomeModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRouting} from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuTopComponent } from './menu-top/menu-top.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRouting
  ],
  declarations: [ DashboardComponent, SidebarComponent, MenuTopComponent ]
})
export class DashboardModule { }
