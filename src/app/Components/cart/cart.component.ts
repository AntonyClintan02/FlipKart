import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AlertComponent } from './../alert/alert.component';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  productPrice:any = '';
  product:any = [];
  grandTotal:number = 0;
 
  constructor(
    private cart$: CartService,
    private modalService: MdbModalService,
    private toastr: ToastrService
    ) {
      this.getGrandTotal();
  }
  
  ngOnInit(): void {}

    getGrandTotal(){
      this.grandTotal = 0;
      this.cart$.getCart().subscribe(res=>{
        this.product=res && res.length ? res : [];
        this.product.map(a=>{
          this.grandTotal += a.total;
      })
    });
}
  removeItem(item:any){
    this.cart$.deleteCart(item);
    setTimeout(() => {this.getGrandTotal()}, 1);
    this.toastr.success('Item removed successfully');
  }

  emptyCart(){
    this.cart$.deleteAll();
  }

  increaseQuantity(item){
    let quantity:number;
    let total:number;
    this.product.forEach(element => {
      if(item.id == element.id){
      if(element.quantity<=4){
      quantity = element.quantity += 1;
      total= element.price * element.quantity;
      if(element.quantity == 5)this.toastr.warning('Maximum select item reached!','',{
        timeOut:2000
      });
    }
     }});
    const data = {
      quantity: quantity,
      total: total
    };
    this.cart$.updateTotal(item.key, data)
    setTimeout(() => {this.getGrandTotal()}, 3);
  }
          

  decreaseQuantity(item){
      let quantity:number;
      let total:number;
    this.product.forEach(element => {
      if(item.id == element.id){
      if(element.quantity!=1){ 
      quantity = element.quantity -= 1;
      total = (element.total - element.price);
      }
    }
  })
    const data = {
      quantity: quantity,
      total: total
    };
    this.cart$.updateTotal(item.key, data)
    setTimeout(() => {this.getGrandTotal()}, 3);
  }

  removeItemModalRef: MdbModalRef<AlertComponent>;
  
  openRemoveItemModal(item) {
    this.removeItemModalRef = this.modalService.open(AlertComponent, {
      containerClass: 'top',
      keyboard: false,
      ignoreBackdropClick: true,
      modalClass: ' modal-dialog-centered',
    });
    this.removeItemModalRef.onClose.subscribe((res) => {
      if (res){
         this.removeItem(item);
        }
    });
  }

}
