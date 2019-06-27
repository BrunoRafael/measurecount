import { ConfirmModalComponent } from './../../modals/confirm-modal/confirm-modal.component';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'lodash';
import { Router } from '@angular/router';

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
    private router: Router,
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private toastr: ToastrService,
    private _modalService: NgbModal
  ){}

  ngOnInit() {
    this.searchInputForm = this.formBuilder.group({
      searchUserValue: ''
    })

    this.userService.getAllUsers().subscribe(
      (usersResponse) => {
        this.users = usersResponse;
      },
      (reason) => {
        this.toastr.warning('Error', 'Não foi possível buscar usuário');
      }
    )

    this.onChanges();
  }

  editUser(user: any){
    if(user.login == "admin" || user.login == "operador") {
      this.toastr.warning('Não é permitido editar nenhum usuário padrão', 'Error');
    } else {
      this.router.navigate(["/dashboard/editUser"], {state: {data: user}}).
        then(data => {
          this.toastr.success('Sucesso', `Usuário ${user["firstName"]} editado com sucesso`);
        })
        .catch(reason => {
          this.toastr.error('Erro', reason.message);
        });
    }
  }

  removeUser(user: any){
    if(user.login == "admin" || user.login == "operador") {
      this.toastr.warning('Não é permitido remover nenhum usuário padrão', 'Error');
    } else {
      let modal = this._modalService.open(ConfirmModalComponent, user);
      modal.componentInstance.selectedUser = user;
      modal.result.then((user) => {
        this.userService.removeUser(user).subscribe(removedUser => {
          for (let i = 0; i < this.users.length; i++){
            let savedUser = this.users[i];
            if(_.isEqual(removedUser, savedUser)){
                this.users.splice(i, 1);
                this.toastr.success('Usuário removido com sucesso!', user["firstName"]);
                if(_.isEqual(this.userService.currentUserLogged(), removedUser)){
                  this.router.navigate(["./login"])
                    .then(data => {
                      this.toastr.success('Realize autenticação novamente', `O usuário ${user["firstName"]} foi removido`);
                    })
                    .catch(reason => {
                      this.toastr.warning('Error', 'Não foi possível voltar a página de autenticação');
                    });
                }
            }
          }
        });
      }).catch((reason) => {
        console.log('Dismissed action: ' + reason);
      });
    }
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
