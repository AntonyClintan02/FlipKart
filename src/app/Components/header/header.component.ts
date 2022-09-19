import { LogOutComponent } from './../user/log-out/log-out.component';
import { UserService } from 'src/app/Service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { CartService } from 'src/app/Service/cart.service';
import { ProductServiceService } from 'src/app/Service/product-service.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { SignInComponent } from '../user/sign-in/sign-in.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   productData;
   controls:any;
   totalItem : number=0;
   public searchterm !: string;
   public filterCategory:any;
   modalRef: MdbModalRef<SignInComponent> | null = null;
   paramSub: Subscription;
  constructor(
              private cart$:CartService,
              private router: Router,
              private product: ProductServiceService,
              private modalService: MdbModalService,
              public userService :UserService,
              private route: ActivatedRoute,
              // private route: ActivatedRoute,
               ) {
                this.paramSub = this.route.queryParamMap.subscribe(queryParams => {
                  const param: any = queryParams['params'];
                  if(param){  
                  }
            })
              }

  ngOnInit(): void {
    this.cart$.getCart().subscribe(res=>{
         this.totalItem= res.length;
    })
    this.product.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
     )
    ).subscribe(data=>{
      this.productData=data
      this.filterCategory=data;
    });

  }
search(event:any){
  this.searchterm= (event.target as HTMLInputElement).value;
  this.cart$.search.next(this.searchterm);
}

filter(category:string){
  this.router.navigate(['/products'],{ queryParams: {category: category} });
}

 openModal() {
    this.modalRef = this.modalService.open(SignInComponent, {
     
    });
}
logoutModalRef: MdbModalRef<LogOutComponent>;
logoutModal(){
  this.logoutModalRef = this.modalService.open(LogOutComponent,{
    containerClass: 'top',
    keyboard: false,
    ignoreBackdropClick: true,
    modalClass: ' modal-dialog-top modal-sm',
  });
 
}
}
