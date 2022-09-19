import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Product } from 'src/app/Modals/product.modal';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

private dbPath = "/Catagories";
productRef: AngularFirestoreCollection<Product>

constructor( private db: AngularFirestore) {
    this.productRef= this.db.collection(this.dbPath,ref=> ref.orderBy('price','asc'));
   }
 
   getAll(){
    return this.productRef.snapshotChanges().pipe(map(a=>a.map(c=>({uid:c.payload.doc.id,...c.payload.doc.data()}))));
  }
  getData(uid){
    return this.productRef.doc(uid).valueChanges()
  }
  //Create Product
  create(product: any) {
    return this.productRef.add(product);
  }
  //Update Product
  update(id: string, data: any) {
    console.log(id,data);
    return this.productRef.doc(id).update(data);
  }
  //delete Product
  delete(id: string) {
    return this.productRef.doc(id).delete();
  }
  // delete(product,id: string) {
  //   return this.productRef.doc(`${product.category}`).collection(`${product.category}`)
  //   .doc(id).delete();
  // }
}
