import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../../admin.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  formEdit : FormGroup;
  productData :any = [];
  data: any;
  constructor(public modalRef: MdbModalRef<EditFormComponent>,
              private adminService: AdminService,
              private formBuilder : FormBuilder,
              private toastr : ToastrService) {
                this.formEdit = this.formBuilder.group({
                  productName: ['', [Validators.required] ],
                  description: ['' , [Validators.required] ],
                  price:  ['' , [Validators.required] ],
                  imageUrl: ['' , [Validators.required] ],
                  category: ['', [Validators.required] ]
                })
                 
              }

  ngOnInit(): void {
         this.adminService.getData(this.data.uid).subscribe(data=>{
         this.productData = data;
         console.log(data)
         this.setFormValue(this.productData);

})

  }

   setFormValue(data: any) {
    this.formEdit.patchValue({
      productName: data?.title,
      description: data?.description,
      price: data?.price,
      imageUrl: data?.image,
      category: data?.category,
      quantity: [1],
      timeStamp: new Date().getTime(),
    })
  }

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }

  editData(){
    let obj = Object.assign({},this.formEdit.value);
    obj['total'] = obj.price;
    obj['timeStamp'] = new Date().getTime(),
    console.log(this.data.uid);
    this.adminService.update(this.data.uid,obj );
    this.close();
    this.toastr.success('Update Successfully','',{
      timeOut: 1000
    })
  }
}
