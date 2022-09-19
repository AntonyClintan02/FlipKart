import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../../admin.service';
import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-delete-operation',
  templateUrl: './delete-operation.component.html',
  styleUrls: ['./delete-operation.component.scss']
})
export class DeleteOperationComponent implements OnInit {
  data: any;
  constructor(public modalRef: MdbModalRef<DeleteOperationComponent>,
              private adminService :AdminService,
              private toast : ToastrService) { }

  ngOnInit(): void {
  }
  onDelete(){
    this.adminService.delete(this.data.uid);
    this.modalRef.close();
    this.toast.success('Successfully','Item Deleted', {
      timeOut : 3000
    })
  }
}
