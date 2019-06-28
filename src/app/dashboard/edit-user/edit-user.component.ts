import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})
export class EditUserComponent implements OnInit {

  updateUserForm: FormGroup;
  updatedUser: any;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService) { }

  get formControl() { return this.updateUserForm.controls; }

  ngOnInit() {
    this.updatedUser = history.state.data;
    this.updateUserForm = this.formBuilder.group({
      jobFunction: [this.updatedUser.jobFunction, Validators.required],
      sector: [this.updatedUser.sector, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      firstName: [this.updatedUser.firstName, Validators.required],
      lastName: [this.updatedUser.lastName],
      role: [this.updatedUser.role],
      login: [this.updatedUser.login, [Validators.required]]
    }, {
        validator: this.matchPassword("password", "confirmPassword")
    });
  }

  onSubmit(action){
    if(action == "Send"){
      this.submitted = true;
      if(!this.updateUserForm.invalid){
        //Get User by ID
        let newUpdatedUser = this.updateUserForm.value
        let persistedUser = JSON.parse(localStorage.getItem(this.updatedUser.login));
 
        newUpdatedUser["id"] = persistedUser["id"];
        delete newUpdatedUser["confirmPassword"];
        this.userService.updateUser(newUpdatedUser).subscribe(
          (user) => {
            //Remove usuário antes da edição e adiciona novo usuário com valores editados
            localStorage.removeItem(this.updatedUser.login);
            localStorage.setItem(newUpdatedUser.login, newUpdatedUser);
            
            this.router.navigate(["/dashboard/searchUser"])
                .then(data => {
                  this.toastr.success('Sucesso', `Usuário ${user["firstName"]} atualizado com sucesso`);
                })
                .catch(e => {
                  this.toastr.error('Erro', e.message);
                });
          }, 
          (err) => {
            this.toastr.error('Erro', err.message);
          }
        );
      }
    } else if(action == "Cancel"){
      this.router.navigate(["/dashboard/searchUser"])
        .then(data => {})
        .catch(e => {
          this.toastr.error('Erro', e.message);
        });
    }
    
  }

  private matchPassword(controlName: string, matchingControlName: string){
      return (formGroup: FormGroup) => {
          const control = formGroup.controls[controlName];
          const matchingControl = formGroup.controls[matchingControlName];
  
          if (matchingControl.errors && !matchingControl.errors.mustMatch) {
              // return if another validator has already found an error on the matchingControl
              return;
          }
  
          // set error on matchingControl if validation fails
          if (control.value !== matchingControl.value) {
              matchingControl.setErrors({ mustMatch: true });
          } else {
              matchingControl.setErrors(null);
          }
      }

  }

}

