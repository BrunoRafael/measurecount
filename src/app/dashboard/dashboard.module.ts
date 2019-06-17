import { FormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRouting} from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuTopComponent } from './menu-top/menu-top.component';
import { AboutComponent } from './about/about.component';
import { RegisterItemComponent } from './register-item/register-item.component';
import { RegisterUserComponent } from './register-user/register-user.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    DashboardRouting
  ],
  declarations: [ DashboardComponent, SidebarComponent, MenuTopComponent, AboutComponent, RegisterItemComponent, RegisterUserComponent ]
})
export class DashboardModule { }
