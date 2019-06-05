import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  title = 'angular-project-training';
  showBody: Boolean;

  items: any = ["alert-info", "alert-success", "alert-warning", "alert-danger"];

  constructor() {}

  ngOnInit() {}

  showPageContent(){
    this.showBody = !this.showBody;
  }

  onChangeAlert(selectedValue){
    console.log(selectedValue);
  }

  onKeyUp(event: KeyboardEvent){
    console.log((<HTMLInputElement> event.target).value);
  }

}
