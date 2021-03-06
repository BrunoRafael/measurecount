import { HomeRoutingModule } from './home.routing';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [ 
        CommonModule,
        HomeRoutingModule 
    ],
    declarations: [ HomeComponent ]
})
export class HomeModule { }