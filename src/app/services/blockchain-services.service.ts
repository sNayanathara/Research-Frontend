import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Web3 from 'web3';

declare let window: any;
let selectedAccount;
let owner;
let tokenThyme;
let fileStore;
let loading;
// let tokenThymeBalance;

export const thyme_address = '0x1F2ECf6960D783AbEe975a85A3820F3B4AC89D0e';
export const thyme_abi = [{ "inputs": [{ "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_symbol", "type": "string" }, { "internalType": "uint256", "name": "_decimals", "type": "uint256" }, { "internalType": "uint256", "name": "_totalSupply", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_spender", "type": "address" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_from", "type": "address" }, { "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }]

export const fileStore_address = '0x1ec35B2894aEe1bd84f58588CBbD2da3bAf6F34c';
export const fileStore_abi = [{"inputs":[{"internalType":"address","name":"_addressThyme","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"addressThyme","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"inMemberList","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isMember","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"issueTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"leaveSystem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"members","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"providedDiskSpace","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"diskSpace","type":"uint256"}],"name":"transferDiskSpaceToTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"fileSize","type":"uint256"}],"name":"uploadFiles","outputs":[],"stateMutability":"nonpayable","type":"function"}]

@Injectable({
  providedIn: 'root'
})
export class BlockchainServicesService {

  //calling the function which connects the app to the blockchain(connect to metamask)
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()

  }

  //this function loads data from the blockchaain and store them to the state in the constructor
  async loadBlockchainData() {
    const web3 = window.web3

    // const accounts = await web3.eth.getAccounts()

    //const networkId = await web3.eth.net.getId()

    //Load Token
    tokenThyme = new window.web3.eth.Contract(thyme_abi, thyme_address);

    //Load FileStore
    fileStore = new window.web3.eth.Contract(fileStore_abi, fileStore_address);


    // console.log(`Token balance of ${selectedAccount} is ${tokenThymeBalance}`);

  }

  async balance() {
    const tokenThymeBalance = await tokenThyme.methods.balanceOf(selectedAccount)
    return tokenThymeBalance;
  }

  async getAccounts() {
    const web3 = window.web3
  	const accounts = await web3.eth.getAccounts()

    return accounts;
  }


  async upload(amount, recipient) {
    const approveNUpload = tokenThyme.methods.approve(fileStore_address, amount).send({ from: selectedAccount }).on('transactionHash', (hash) => {
      fileStore.methods.uploadFiles(recipient, amount).send({ from: selectedAccount })
    })

    return approveNUpload;

  }

  // async spaceShare (amount){
    
  //   const share = fileStore.methods.transferDiskSpaceToTokens(amount).send({ from: selectedAccount })
    
  //   return share;
  // }

  async spaceShare (amount){
    
    // let tokenAmount = amount * 2;
    // owner = '0x7433B8aDB3AcA7616F4863bE1c5c7eB1489dc18d';
    // const approveNshare = tokenThyme.methods.approve(fileStore_address, tokenAmount).send({ from: owner }).on('transactionHash', (hash) => { 
      const approveNshare = fileStore.methods.transferDiskSpaceToTokens(amount).send({ from: selectedAccount })
    // })
    return approveNshare;
  }

  async approve (amount) {
    let tokenAmount = amount * 2;
    owner = '0x7433B8aDB3AcA7616F4863bE1c5c7eB1489dc18d';
    const approve = tokenThyme.methods.approve(fileStore_address, tokenAmount).send({ from: owner }) 

    return approve;
    
  }

  // to connect the app to the blockchain
  loadWeb3 = async () => {

    let provider = window.ethereum;

    if (provider) {

      provider.request({ method: 'eth_requestAccounts' }).then((accounts) => {
        selectedAccount = accounts[0];
        console.log(`Selected Account is ${selectedAccount}`);
        // console.log(`Token balance of ${selectedAccount} is ${tokenThymeBalance}`);

      }).catch((err) => {
        console.log(err);
      });

      window.ethereum.on('accountsChanged', function (accounts) {
        selectedAccount = accounts[0];
        console.log(`Selected Account is changed to ${selectedAccount}`);
      });

      window.web3 = new Web3(provider)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  constructor() {
    loading = true;
    this.componentWillMount();
  }
}
