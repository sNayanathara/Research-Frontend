import { Component, OnInit } from '@angular/core';
import { BlockchainServicesService } from "../../services/blockchain-services.service";
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import {  MatDialog } from '@angular/material/dialog';

declare var window: any; 

@Component({
  selector: 'app-disk-space-share',
  templateUrl: './disk-space-share.component.html',
  styleUrls: ['./disk-space-share.component.css']
})
export class DiskSpaceShareComponent implements OnInit {

  // result: string = '';

  constructor(private blockchainService: BlockchainServicesService) { }

  ngOnInit(): void {
    // var bs = new BlockchainServicesService();
    // bs.componentWillMount();
    this.blockchainService.componentWillMount();
  }

  balance: number;
  sendingAmount: number;
  recipientAddress: string;
  status: string;

  setStatus = message => {
    this.status = message;
  };

  async refreshBalance() {
    this.blockchainService.balance().then(value => this.balance = value);
    // e => {this.setStatus('Error getting balance; see log.')}
  }

  async shareSpace(sendingAmount) {
    this.blockchainService.spaceShare(sendingAmount).then(this.refreshBalance)
    console.log(this.balance)
    console.log(this.sendingAmount)
  }

  // async shareSpace(sendingAmount) {
  //   this.blockchainService.approve(sendingAmount).then(this.refreshBalance)
  //   const dialogData = new ConfirmDialogModel("Confirm Action");

  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     maxWidth: "600px",
  //     data: dialogData
  //   });

  //   // dialogRef.afterClosed().subscribe(dialogResult => {
  //   //   this.result = dialogResult;
  //   // });

  
  // }

}
