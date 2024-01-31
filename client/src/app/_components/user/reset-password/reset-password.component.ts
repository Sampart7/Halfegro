import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Password } from 'src/app/models/passwrod';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  
  constructor(private route: ActivatedRoute, private accountService: AccountService,
    private formBuidler: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.registerForm = this.formBuidler.group({
      token: ["", Validators.required],
      password: ["", [ Validators.required, Validators.minLength(6), Validators.maxLength(24), 
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/)]],
      confirmPassword: ["", [ Validators.required, this.matchValues("password") ]],
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

  resetPassword() {
    this.route.queryParams.subscribe(params => {
      const passwordData: Password = {
        token: params['token'],
        password: this.registerForm.value.password,
        confirmPassword: this.registerForm.value.confirmPassword
      }
      
      this.accountService.resetPassword(passwordData).subscribe({
        error: (error) => console.error('Error:', error)
      });
      this.router.navigateByUrl("/")
    });
  }
}
