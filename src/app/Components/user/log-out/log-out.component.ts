import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UserService } from 'src/app/Service/user.service';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent implements OnInit {

  constructor( public modalRef: MdbModalRef<HeaderComponent>,
              private userService: UserService) { }

  ngOnInit(): void {
  }
logOut(){
  this.userService.signOut();
  this.modalRef.close();
}

}
