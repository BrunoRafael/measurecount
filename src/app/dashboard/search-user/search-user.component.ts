import { UserService } from 'src/app/services/user.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.sass']
})
export class SearchUserComponent implements OnInit {
  users: any = []
  searchInputForm = null;
  searchUserTokenFilter: any;
  
  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    this.searchInputForm = this.formBuilder.group({
      searchUserToken: ''
    })

    this.userService.getUsers().subscribe(
      (usersResponse) => {
        this.users = usersResponse;
      },
      (err) => {
        this.toastr.warning('Error', 'Não foi possível buscar usuário');
      }
    )

    this.onChanges();
  }

  onChanges(): void {
    this.searchInputForm.get('searchUserToken').valueChanges.subscribe(val => {
      this.searchUserTokenFilter = { 
        $or : [ 
          {'jobFunction': val},
          {'sector': val},
          {'firstName': val},
          {'lastName': val},
          {'login': val},
          {'role': val}
        ]}
    });
  }
}
