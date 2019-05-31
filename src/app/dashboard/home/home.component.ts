import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  title = 'angular-project-training';
  constructor(private router: Router) { }

  ngOnInit() {}

  logout(){
    this.router.navigate(['./login']).
    then(data => {
      console.log('Route exists, redirection is done');
    })
    .catch(e => {
      console.log('Route not found, redirection stopped with no error raised');
    });
  }

}
