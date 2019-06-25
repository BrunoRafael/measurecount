import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})
export class EditUserComponent implements OnInit {

  updateUserForm: FormGroup
  submitted = false;

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService) { }

  get formControl() { return this.updateUserForm.controls; }

  ngOnInit() {
    let updatedUser = history.state.data;
    this.updateUserForm = this.formBuilder.group({
      jobFunction: [updatedUser.jobFunction, Validators.required],
      sector: [updatedUser.sector, Validators.required],
      password: [updatedUser.password, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [updatedUser.password, Validators.required],
      firstName: [updatedUser.firstName, Validators.required],
      lastName: [updatedUser.lastName],
      role: [updatedUser.role],
      login: [updatedUser.login, [Validators.required]]
    }, {
        validator: this.matchPassword("password", "confirmPassword")
    });
  }

  onSubmit(action){
    if(action == "Send"){
      this.submitted = true;
      if(!this.updateUserForm.invalid){
        this.userService.updateUser(this.updateUserForm.value).subscribe(
          (user) => {
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

