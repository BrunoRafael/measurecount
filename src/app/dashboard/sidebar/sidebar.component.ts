import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) { }
  ngOnInit() {}
  openSidebarLateral(){}

  logout(){
    this.auth.logout().subscribe(
      user => {
        this.router.navigate(['./login']).
        then(data => {
          console.log('Route exists, redirection is done');
        })
        .catch(e => {
          console.log('Route not found, redirection stopped with no error raised');
        });
      }
    )
    
  }

}
