import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.sass']
})
export class UserRegisterComponent implements OnInit{
  userRegisterForm: FormGroup
  constructor(private formBuilder: FormBuilder){}

  ngOnInit(){
    this.userRegisterForm = this.formBuilder.group({
      "nameUserRegisterInput": ['', Validators.required],
      "employeeUserRegisterInput": ['', Validators.required],
      "sectorUserRegisterInput": ['', Validators.required],
      "emailUserRegisterInput": ['', Validators.required],
      "passwordUserRegisterInput": ['', Validators.required],
      "confirmPasswordUserRegisterInput": ['', Validators.required]
    })
  }
}