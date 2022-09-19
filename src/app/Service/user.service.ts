import { ToastrService } from 'ngx-toastr';
import { User } from './../Modals/user.modal';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 userData: any;
 userRef: AngularFirestoreCollection<any> 
  constructor(public afs: AngularFirestore,
              public afAuth: AngularFireAuth,
              public router: Router,
              public ngZone: NgZone,
              private toastr: ToastrService,
              ) 
      {
        
        this.userRef = this.afs.collection('user')
        this.afAuth.authState.subscribe(user=>{
          if(user){
            this.userData=user;            
            localStorage.setItem('user',JSON.stringify(this.userData));
            JSON.parse(localStorage.getItem('user'));
          }
          else{
            localStorage.setItem('user','null');
            JSON.parse(localStorage.getItem('user')!);
          }
        });
       }

  async signIn(email: string, password: string){
    try {
    const result = await this.afAuth.signInWithEmailAndPassword(email, password);
    this.ngZone.run(() => {
      if(email == "anthonyyogesh10@gmail.com")
        this.router.navigate(['admin']);
      else
      this.router.navigate(['products']);
    });
    this.SetUserData(result.user);
    this.toastr.success('loggedIn Successfully!', '', {
      timeOut: 2000
    });
  } catch (error) {
    window.alert(error.message);
  }};

  signUp(email,password){
    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(result=>{
         this.SetUserData(result.user);
         this.toastr.success(' Signed up Successfully!','',{
          timeOut:3000,
         })
    })
     .catch(error=>{
      window.alert(error.message);
     });
  }

get isLoggedIn(): boolean {
  const user = JSON.parse(localStorage.getItem('user')!);
  return user !== null ? true : false;
}

SetUserData(user:any){
   const userData:User={
    uid: user.uid,
    email: user.email,
    displayName:user.displayName,
   };
    localStorage.setItem('user',JSON.stringify(userData));
    return this.userRef.doc(user.uid).set(userData,{
    merge: true,
   });
}
signOut(){
  return this.afAuth.signOut().then(()=>{
    localStorage.removeItem('user');
    this.router.navigate([""]);
    this.toastr.success('logout successfully!','',{
      timeOut:2000
    });
  })
}
}
