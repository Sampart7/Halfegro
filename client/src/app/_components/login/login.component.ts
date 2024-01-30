import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  model: any = {}

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
}
