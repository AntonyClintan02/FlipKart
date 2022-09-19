import { Product } from './../Modals/product.modal';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})

export class ProductServiceService {
  
  private dbPath = "/Catagories";
  productRef: AngularFirestoreCollection<Product>;
  lastRef:  AngularFirestoreCollection<Product>;
  // dbData:any;
  
  constructor( private db: AngularFirestore) {
    this.productRef= this.db.collection(this.dbPath,ref => ref.orderBy("timeStamp","asc").limit(10));
    this.lastRef = this.db.collection(this.dbPath);
   }
   getAll(){
      return this.productRef;
   }

   getdb(){
     return this.db;
   }

    getProductByCategory(category){
     return this.productRef.ref.where('category','==', category).get()
   }
   
  }
