import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from '../Modals/product.modal';


@Injectable({
  providedIn: 'root'
})

export class CartService {

public search =new BehaviorSubject<string>("");
 
private dbPath =  '/Cart';
 cartRef: AngularFireList<Product> = null;

  constructor(private db: AngularFireDatabase) {
    this.cartRef= db.list(this.dbPath);
  }
 
 getCart(){
    return this.cartRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    )
 }
 
 addCart(product:Product)
 {
     this.cartRef.push(product);
     
 }

deleteCart(id:any)
{
  return this.cartRef.remove(id);
}

deleteAll()
{
  return this.cartRef.remove();
}
updateTotal(id:string, value:any )
{
    return this.cartRef.update(id, value)
}

}
