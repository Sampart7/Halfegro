import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/member.service';

@Component({
  selector: 'app-userEdit',
  templateUrl: './userEdit.component.html',
  styleUrls: ['./userEdit.component.scss']
})
export class UserEditComponent implements OnInit{
  member!: Member;
  user: User | null = null;
  @ViewChild("editForm") editForm: NgForm | undefined;
  @HostListener("window:beforeunload", ["$event"]) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, 
    private memberService: MembersService, 
    private toastr: ToastrService) { 
      this.accountService.currentUser.pipe(take(1)).subscribe({
        next: user => this.user = user
      });
  }
  
  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if(!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: member => {
        this.member = member
      }
    })
  }

  updateMember() {
    this.memberService.updateMember(this.member).subscribe({
      next: () => {
        this.toastr.success('Profile updated successfully');
        this.editForm?.reset(this.member);
        this.loadMember();
      }
    })
  }
}
