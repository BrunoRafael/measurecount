import { ConfirmModalComponent } from './../../modals/confirm-modal/confirm-modal.component';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'lodash';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.sass']
})
export class SearchUserComponent implements OnInit {
  users: any = []
  searchInputForm = null;
  searchUserValueFilter: any;
  
  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private toastr: ToastrService,
    private _modalService: NgbModal
  ){}

  ngOnInit() {
    this.searchInputForm = this.formBuilder.group({
      searchUserValue: ''
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

  editUser(user: any){
    console.log(user);
  }

  removeUser(user: any){
    let modal = this._modalService.open(ConfirmModalComponent, user);
    modal.componentInstance.selectedUser = user;
    modal.result.then((user) => {
      this.userService.removeUser(user).subscribe(removedUser => {
        //REMOVER APÓS REALIZAR COMUNICAÇÃO COM O SERVIDOR
        for (let i = 0; i < this.users.length; i++){
          let savedUser = this.users[i];
          if(_.isEqual(removedUser, savedUser)){
              // REMOVER APÓS SE COMUNICAR COM O SERVIDOR
              this.users.splice(i, 1);
          }
      }
      });
    }).catch((reason) => {
      console.log('Dismissed action: ' + reason);
    });
  }

  onChanges(): void {
    this.searchInputForm.get('searchUserValue').valueChanges.subscribe(val => {
      this.searchUserValueFilter = { 
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
