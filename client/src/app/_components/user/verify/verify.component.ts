import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {
  constructor(private route: ActivatedRoute, private accountService: AccountService) {
    this.route.queryParams.subscribe(params => {
        const token = params['token'];
        this.accountService.verifyAccount(token).subscribe({
          error: () => console.log("error")
        });
    });
  }
}
