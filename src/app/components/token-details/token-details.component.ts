import { Component, OnInit } from '@angular/core';
import { BlockchainServicesService } from "../../services/blockchain-services.service";

let owner = '0x7433B8aDB3AcA7616F4863bE1c5c7eB1489dc18d';

@Component({
  selector: 'app-token-details',
  templateUrl: './token-details.component.html',
  styleUrls: ['./token-details.component.css']
})
export class TokenDetailsComponent implements OnInit {

  _displayedColumns = ['name', 'rental', 'received', 'rewards', 'total'];

  files: File[] = []; 
  accounts: any;
  account: any;
  accountAddress = "";
  rental = "";
  received = "";
  rewards = "";
  totalTokens = "";
  

  constructor(private blockchainService: BlockchainServicesService) {
    this.fetchAccounts();
    this.accountAddress = this.account;
    this.rental;
    this.received = this.blockchainService.balance().toString();
    this.rewards;
    this.blockchainService.balance().then(value => this.totalTokens = value).catch(e => console.log(e))
    console.log(`Received is ${this.totalTokens}`);
    console.log('AVGTDDF');
   }

  ngOnInit(): void {
    // var bs = new BlockchainServicesService();
    // bs.componentWillMount();
    //this.blockchainService.componentWillMount();
    
  }

  async fetchAccounts() {

    this.blockchainService.getAccounts().then(accs => {
      this.accounts = accs;
      this.account = this.accounts[0];
      console.log(this.accounts);
    })
  }



}
