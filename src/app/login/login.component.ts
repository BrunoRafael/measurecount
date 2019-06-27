import { UserService } from 'src/app/services/user.service';
import { Component, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ElectronService } from 'ngx-electron';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from './login.router.animations';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnDestroy {

  loginForm: FormGroup
  electronService: ElectronService;
  model: any = {};
  submitted = false;

  loginSubscribe: Subscription;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private toastr: ToastrService) {
    this.loginForm = this.formBuilder.group({
      'login': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  get formControl() { return this.loginForm.controls; }

  onSubmit(){
    if(!this.loginForm.invalid){
      let credentials = this.loginForm.value;
      this.loginSubscribe = this.userService.login(credentials.login, credentials.password).subscribe(
        () => { 
          this.router.navigate(["/dashboard"])
            .then(data => {
              this.toastr.success('Seja bem vindo!', "");
            })
            .catch(e => {
              this.toastr.warning('Error', 'Não foi possível concluir autenticação');
            });
        },
        (err) => { 
          this.toastr.warning('Autenticação falhou', err.message);
        }
      )
    } else {
      this.submitted = true;
    }
  }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.loginSubscribe.unsubscribe();
  }
}
