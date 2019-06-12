import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ElectronService } from 'ngx-electron';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from './login.router.animations';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  animations: [routerTransition()]
})
export class LoginComponent {

  loginForm: FormGroup
  electronService: ElectronService
  model: any = {}

  constructor(private router: Router, private formBuilder: FormBuilder, private _electronService: ElectronService) {
    this.loginForm = this.formBuilder.group({
      'loginInput': ['', Validators.required],
      'passwordInput': ['', Validators.required]
    });
  }
  onSubmit(){
    //if(!this.loginForm.invalid){
      console.log("Tudo ok");
      this.router.navigate(["/dashboard"])
        .then(data => {
          console.log('Route exists, redirection is done');
        })
        .catch(e => {
          console.log('Route not found, redirection stopped with no error raised');
        });
    //} else {
    // console.log("Invalid login");
    //}
  }

  createUser(){
    this._electronService.ipcRenderer.send('open-create-user-window');
  }

}
