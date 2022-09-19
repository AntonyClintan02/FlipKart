import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../../admin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { __values } from 'tslib';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {
  formAdd : FormGroup;
  productData:any =[];

  constructor(private adminService: AdminService,
              private formBuilder : FormBuilder,
              public modalRef: MdbModalRef<AddFormComponent>,
              private toast: ToastrService ) {

    this.formAdd = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price:  [, [Validators.required] ],
      image: ['', [Validators.required] ],
      quantity: [1],
      timeStamp: new Date().getTime(),
    })
   }

  ngOnInit(): void {
    
     
  }
close(): void {
  const closeMessage = 'Modal closed';
  this.modalRef.close(closeMessage)
}
addData(){
  let obj = Object.assign({},this.formAdd.value);
  obj['total'] = obj.price;
  console.log(obj);
  this.adminService.create(obj);
  console.log('hit');
  
  console.log(this.formAdd);
  
  this.close();
  this.toast.info('Successfully', 'New Product Added',{
    timeOut:3000
  })
}
}


