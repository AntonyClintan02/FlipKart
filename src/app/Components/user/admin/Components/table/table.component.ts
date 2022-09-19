import { DisplayComponent } from './../forms/display/display.component';
import { EditFormComponent } from './../forms/edit-form/edit-form.component';
import { AddFormComponent } from './../forms/add-form/add-form.component';
import { Component, OnInit, Pipe } from '@angular/core';
import { AdminService } from '../../admin.service';
import {  MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DeleteOperationComponent } from '../forms/delete-operation/delete-operation.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent  implements OnInit {
   currentPage:number = 1;
   itemsPerPage:number = 4;
   product: any;
   productData: any;
   id: any;
   data: any;
   modalRef: MdbModalRef<AddFormComponent>

  constructor( private adminService: AdminService ,
               private modalService:MdbModalService) { }

ngOnInit(): void {
     this.adminService.getAll().subscribe(data=>{
       this.product = data;
      //  this.productData = data[this.data.id]
       
       console.log(this.product); 
       console.log(this.product.mobile);
             
       
       
    });
    
}
  //  deleteItem(id){
  //     this.adminService.delete(id);
  //     this.tostr.warning('Item Deleted Successfully','',{
  //       timeOut:2000
  //     })
  //    }

config1 = {
  animation: true,
  backdrop: true,
  containerClass: 'right',
  data: {
    title: 'Custom title'
  },
  ignoreBackdropClick: false,
  keyboard: true,
  modalClass: 'modal-top-right .modal-fullscreen'
}

openModalAdd(){
  this.modalRef = this.modalService.open(AddFormComponent,this.config1);
}
 
// Html for Delete
// "onDelete(value.uid)"
openModalDelete(valueUid,productData){
  this.modalRef = this.modalService.open(DeleteOperationComponent,{
    animation: true,
    backdrop: true,
    containerClass: 'right',
    data: {
      data: {
        title: 'Custom title',
        uid: valueUid,
        productData: this.productData,
      }
    },
    ignoreBackdropClick: false,
    keyboard: true,
    modalClass: 'modal-top-right .modal-fullscreen'
  });
}

openModalEdit(value){
  this.modalRef = this.modalService.open(EditFormComponent,{
    animation: true,
    backdrop: true,
    containerClass: 'right',
    data: {
      data: {
        title: 'Custom title',
        uid: value
      }
    },
    ignoreBackdropClick: false,
    keyboard: true,
    modalClass: 'modal-top-right .modal-fullscreen'
  });
}

openModalDisplay(id){
  this.modalRef = this.modalService.open(DisplayComponent,{
    animation: true,
    backdrop: true,
    containerClass: 'right',
    data: {
      data: {
        title: 'Custom title',
        id: id
      }
    },
    ignoreBackdropClick: false,
    keyboard: true,
    modalClass: 'modal-top-right .modal-fullscreen'
  });
}

}
