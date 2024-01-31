import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Password } from 'src/app/models/passwrod';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  model: any = {}
  forgotedPassword = false
  registerForm: FormGroup = new FormGroup({});
  
  constructor(public accountService: AccountService, private router: Router, 
    private toastr: ToastrService, private formBuidler: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.registerForm = this.formBuidler.group({
      email:["", [ Validators.required, 
        Validators.pattern("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" + 
        "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,3})$")
      ]],
      password: ["", [ Validators.required, 
        Validators.minLength(6), Validators.maxLength(24), 
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/)
      ]],
    });
  }

  login() {
    this.accountService.login(this.registerForm.value).subscribe({
      next: () => { 
        this.router.navigateByUrl("/products") 
        this.model = {}
      },
      error: errorObject => this.toastr.error(errorObject.error)
    })
  }

  logout(){
    this.accountService.Logout()
    this.router.navigateByUrl("/")
  }

  forgotPassword() {
    this.accountService.forgotPassword(this.model.email).subscribe({
      error: error => console.log(error)
    }); 
  }

  changeState() {
    this.forgotedPassword = !this.forgotedPassword
  }
  
}
