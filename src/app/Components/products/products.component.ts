import {  ToastrService } from 'ngx-toastr';
import { Product } from './../../Modals/product.modal';
import { Component, OnDestroy, OnInit,} from '@angular/core';
import { map, Subscription } from 'rxjs';
import { CartService } from 'src/app/Service/cart.service';
import { ProductServiceService } from 'src/app/Service/product-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private dbPath = "/Catagories";
  public filterCategory:any='';
   productData:any='';
   data:any ='';
   ProductId:any= []
   searchkey:string="";
   CartData:any='';
   cartId:any='';
   paramSub:Subscription;

   //Data object for listing items
   tableData: any[] = [];

   //Disable next and prev buttons
     disable_next: boolean = false;
     disable_prev: boolean = false;
    //Save first document in snapshot of items received
    firstInResponse: any = [];

    //Save last document in snapshot of items received
    lastInResponse: any = [];
  
    //Keep the array of first document of previous pages
    prev_strt_at: any = [];
  
    //Maintain the count of clicks on Next Prev button
    pagination_clicked_count = 0;
  
  constructor(private product$ : ProductServiceService,
              private cart$ : CartService,
              private tostr: ToastrService,
              private route: ActivatedRoute,
              ) {
                setTimeout(() => {
                  let product = []
                     this.cart$.getCart().subscribe(res=>{
                      product=res
                      product.map(a=>{
                        this.ProductId.push(a.title)                  
                      })
                      });
                  }, 50);
                    // This method is used to get router params // 
                  this.paramSub = this.route.queryParamMap.subscribe(queryParams => {
                    const param: any = queryParams['params'];
                    if(param && param.category){
                      setTimeout(() => {
                        this.filter(param.category)
                      }, 50);
                    }
              })
                // method to call fetch Snapdata //
                this.loadItems();
            }

  ngOnInit(): void {
       //Retrive data from FIrestore dataBase
          this.fetchData();
        

         this.cart$.search.subscribe(val=>{
          this.searchkey=val;
        })
        this.cart$.getCart().subscribe(res=>
          this.CartData=res
          )
         console.log(this.CartData);
         
          
  }
   fetchData(){
    return this.product$.getAll().snapshotChanges().pipe(
    map((changes:any) => 
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
     )
     ).subscribe(data=>{

      this.productData = data;
      console.log(this.productData);
      
      this.tableData = data;
      //        //Set the quantity and Totall price in firestore 
      // this.tableData.forEach((a:any)=>{
      //   Object.assign(a,{quantity:1,total:a.price});  
        
      //                 });
      //   console.log(this.data);
                      
   });
  }
  isCartAdded:boolean = false;

  matchValue:any = 0;
   //Add to Cart
   addtoCart(item:Product){
     this.matchValue = this.ProductId.find(a => a == item.title);
       
       if(this.matchValue == item.title){
        this.tostr.info('Already added in Cart', '', { 
          timeOut : 1000
        })
        //  setTimeout(() => {
        //  this.router.navigate(['cart']);
        //  }, 3000);
        }
        else{
          this.cart$.addCart(item);    
          console.log(item);
                 
          this.tostr.success('Added to Cart')
          }
    
  }

  //search filter
  async filter(category){
    if(category.length && this.productData.length){
      if(category == 'all'){
        this.tableData = await this.productData;
      }
      else{
        let data = await this.product$.getProductByCategory(category);
        console.log(data)
        let data2 = [];
        data.forEach(doc => {
          data2.push(doc.data());
        });
        this.tableData = data2;
      }      
    }
  }

  ngOnDestroy(): void{
    if(this.paramSub)this.paramSub.unsubscribe();
  }

   // for snapShot  Pagination //
   loadItems(){
    this.product$.getdb().collection(this.dbPath,ref=> 
      ref.orderBy('timeStamp','desc')
      .limit(10))
      .snapshotChanges()
    .subscribe(response =>{
      // if (!response.length) {
      //   console.log("No Data Available");
      //   return false;
      // }
      this.firstInResponse = response[0].payload.doc;
      
      this.lastInResponse = response[response.length - 1].payload.doc;
      
      this.tableData = [];                        
      console.log(this.tableData);
      
      for (let item of response) {
        this.tableData.push(item.payload.doc.data());
        }
    })
        //Initialize values
        this.prev_strt_at = [];
        this.pagination_clicked_count = 0;
        this.disable_next = false;
        this.disable_prev = false;
     

        //Push first item to use for Previous action
        this.push_prev_startAt(this.firstInResponse);
        
  }
  prevPage() {
    this.disable_prev = true;
    this.product$.getdb().collection(this.dbPath, ref => ref
      .orderBy('timeStamp', 'desc')
      .startAt(this.get_prev_startAt())
      .endBefore(this.firstInResponse)
      .limit(10)
      
    ).get()
      .subscribe(response => {
        this.firstInResponse = response.docs[0];
        this.lastInResponse = response.docs[response.docs.length - 1];
        
        this.tableData = [];
        for (let item of response.docs) {
          this.tableData.push(item.data());
        }
        //Maintaing page no.
        this.pagination_clicked_count--;


        //Enable buttons again
        this.disable_prev = false;
        this.disable_next = false;
      }, error => {
        this.disable_prev = false;
      });
  }

    nextPage(){
      this.disable_next = true;
      this.product$.getdb().collection(this.dbPath,ref=> ref
        .orderBy('timeStamp','desc')
        .startAfter(this.lastInResponse)
        .limit(10)).get()
        .subscribe(response => {
        if (!response.docs.length) {
          this.disable_next = true;
          return;
        }
        this.firstInResponse = response.docs[0];
         

        this.lastInResponse = response.docs[response.docs.length - 1];
        this.tableData = [];
        for (let item of response.docs) {
          this.tableData.push(item.data())
        }

        this.pagination_clicked_count++;

        this.push_prev_startAt(this.firstInResponse);

        this.disable_next = false;
      }, error => {
        this.disable_next = false;
      })
    }
      //Add document
  push_prev_startAt(prev_first_doc) {
    this.prev_strt_at.push(prev_first_doc);
  }

  //Remove not required document 
  pop_prev_startAt(prev_first_doc) {
  
    
    this.prev_strt_at.forEach(element => {
      
      if (prev_first_doc.data().id == element.data().id) {
        element = null;
      }
    });
  }

   //Return the Doc rem where previous page will startAt
   get_prev_startAt() {
    
    if (this.prev_strt_at.length > (this.pagination_clicked_count + 1))
      this.prev_strt_at.splice(this.prev_strt_at.length - 2, this.prev_strt_at.length - 1);
    return this.prev_strt_at[this.pagination_clicked_count - 1];

  }

  //Date formate
  readableDate(time) {
    var d = new Date(time); 
    return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
  }

}
