import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.sass']
})
export class MenuTopComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit() {}

  

}
