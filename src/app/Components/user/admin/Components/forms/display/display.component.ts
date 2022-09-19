import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { map } from 'rxjs';
import { AdminService } from './../../../admin.service';



@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  productData: any;
  data: any;
  image: string;
  constructor( private adminService: AdminService,
               public modalRef: MdbModalRef<DisplayComponent> ) { }
 
  ngOnInit(): void {
    this.adminService.getAll().subscribe(datas=>{


      this.productData = datas[this.data.id];
      this.image = this.productData.image;
      // console.log(this.image);
      
      
    })
  }

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }
}
