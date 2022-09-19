import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UserService } from 'src/app/Service/user.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

 Loginform:FormGroup;
 registerForm:FormGroup;
 isLogin:boolean = false;
 

  constructor( public modalRef: MdbModalRef<SignInComponent>,
               public authService: UserService,
                ) {}

  ngOnInit(): void {

    this.Loginform = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,])
    })

     this.registerForm= new FormGroup({
      emails: new FormControl('',[Validators.required,Validators.email]),
      passwords: new FormControl('',[Validators.required,]),
      reEnterPassword: new FormControl('',[Validators.required])
    })
  }

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }
  logIn(){
    let email=this.Loginform.value.email;
    let password=this.Loginform.value.password;

    this.authService.signIn(email,password);
    this.close();    
  }

  switchLogInAndSignUp(){
    this.isLogin=!this.isLogin;
  }
register(){
 
    let email=this.registerForm.value.emails;
    let password=this.registerForm.value.passwords;

    this.authService.signUp(email,password);
     this.close();
}


}
