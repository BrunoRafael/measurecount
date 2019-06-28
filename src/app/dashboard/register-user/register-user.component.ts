import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.sass']
})
export class RegisterUserComponent implements OnInit {

  registerUserForm: FormGroup
  submitted = false;

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService) { }

  get formControl() { return this.registerUserForm.controls; }

  ngOnInit() {
    this.registerUserForm = this.formBuilder.group({
      jobFunction: ['', Validators.required],
      sector: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['operator'],
      login: ['', [Validators.required]]
    }, {
        validator: this.matchPassword("password", "confirmPassword")
    });
  }

  onSubmit(){
    this.submitted = true;
    if(!this.registerUserForm.invalid){
      let user = this.registerUserForm.value;
      delete user["confirmPassword"];
      this.userService.createUser(user).subscribe(
        (user) => {
          this.router.navigate(["/dashboard/home"])
              .then(data => {
                this.toastr.success('Sucesso', `Usuário ${user["firstName"] + " " + user["lastName"]} cadastrado com sucesso`);
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
