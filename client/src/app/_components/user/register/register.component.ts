import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  maxDate: Date = new Date();
  minDate: Date = new Date();
  registered = false;

  constructor(private accountService: AccountService, 
    private toastr: ToastrService, 
    private formBuidler: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.minDate.setFullYear(this.minDate.getFullYear() - 100);
  }

  initializeForm() {
    this.registerForm = this.formBuidler.group({
      dateOfBirth: ["", Validators.required],
      houseNumber: ["", Validators.required],
      street: ["", Validators.required],
      city: ["", Validators.required],
      country: ["", Validators.required],
      username: ["", Validators.required],
      email:["", [ Validators.required, 
        Validators.pattern("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" + 
        "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,3})$")
      ]],
      password: ["", [ Validators.required, 
        Validators.minLength(6), Validators.maxLength(24), 
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/)
      ]],
      confirmPassword: ["", [ Validators.required, this.matchValues("password") ]],
      agreeToTerms: [false, Validators.requiredTrue],
    });
    this.registerForm.controls["password"].valueChanges.subscribe({
      next: () => this.registerForm.controls["confirmPassword"].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value === control.parent?.get(matchTo)?.value) return null;
      else return { notMatching: true };
    };
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: user => {
        console.log(user)
        this.toastr.info("Verify your password");
        this.registered = true;
      },
      error: error => this.toastr.error(error)
    })
  }

}
