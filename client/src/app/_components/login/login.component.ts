import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Password } from 'src/app/models/passwrod';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  model: any = {}
  forgotedPassword = false

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  login() {
    this.accountService.login(this.model).subscribe({
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
    const email = this.model.email
    if (email) {
      this.accountService.forgotPassword(email).subscribe({
        next: () => this.toastr.success("Reset password link sent to your email."),
        error: () => this.toastr.error("There was an error sending the email.")
      });
    }
  }

  resetPassword() {
    const token = prompt("Please enter your reset token:");
    const newPassword = this.model.password
    const confirmPassword = this.model.confirmPassword
  
    if (newPassword !== confirmPassword) {
      this.toastr.error("Passwords do not match.");
      return;
    }
  
    if (token && newPassword && confirmPassword) {
      const passwordData: Password = {
        token: token,
        password: newPassword,
        confirmPassword: confirmPassword
      };
  
      this.accountService.resetPassword(passwordData).subscribe({
        next: () => {
          this.toastr.success("Your password has been reset successfully.");
          this.router.navigateByUrl('/login');
        },
        error: () => this.toastr.error("There was an error resetting your password.")
      });
    } else this.toastr.error("All fields are required.");
  }

  changeState() {
    this.forgotedPassword = !this.forgotedPassword
  }
  
}
