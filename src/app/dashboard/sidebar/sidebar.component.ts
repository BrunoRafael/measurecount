import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  activePage = 'historyPage'

  constructor(private router: Router, private userService: UserService) { }
  ngOnInit() {}
  openSidebarLateral(){}

  logout(){
    this.userService.logout().subscribe(
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

  onChangePage(pageName){
    this.activePage = pageName
  }

}
