import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user: User | null = null;
  alreadyRegistered = false;

  constructor(private accountService: AccountService) {
    this.accountService.currentUser.pipe(take(1)).subscribe({
      next: user => this.user = user
    });
  }

  changeStatus() {
    this.alreadyRegistered = !this.alreadyRegistered
  }
}
