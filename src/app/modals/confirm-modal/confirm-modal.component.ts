import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-confirm',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.sass']
})
export class ConfirmModalComponent implements OnInit{
  @Input() public selectedUser;

  constructor(public modal: NgbActiveModal) {
    console.log(modal);
  }

  ngOnInit() {
    console.log(this.selectedUser);
  }
}
