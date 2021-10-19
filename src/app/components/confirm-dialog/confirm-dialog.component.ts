import {  MatDialogRef } from '@angular/material/dialog';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { BlockchainServicesService } from "../../services/blockchain-services.service";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  title: string;
  message: string;

  constructor(public blockchainService: BlockchainServicesService, public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
    // Update view with given values
    // this.title = data.title;
    // this.message = data.message;
  }

  ngOnInit(): void {
  }

  onConfirm(sendingAmount): void {
    // Close the dialog, return true
      this.dialogRef.close(this.blockchainService.spaceShare(sendingAmount))
      
    }

    onDismiss(): void {
      // Close the dialog, return false
      this.dialogRef.close(this.blockchainService.approve(0))
    }
  }

  


/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {

  constructor(public title: string) {
  }

}
