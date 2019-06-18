import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  title = 'Smart Balance';
  
  weighingHistory = [
    {name: "Parafuso", value: "14mm, 0.298kg", units: "50 unidades", time: "1 Minute ago", number: "58698989545464546578798"},
    {name: "Haste de Platina", value:" 1.5 metros, 2kg", units: "9 unid", time: "3 minutes ago", number: "02698989983064477578755"},
    {name: "Parafuso", value:"2mm, 0.025kg", units: "780 unidades", time:"Seconds ago", number: "1245456624858766442121"}
  ]

  selectedItem = this.weighingHistory[0];

  constructor() {}
  ngOnInit() {}

  selectItem(item){
    this.selectedItem = item;
  }
}
