class Transaction{
	constructor(){
  	this.transactionID = null;
    this.transactionFee = null;
    this.transactionType = null;
    this.transactionAssets = null;
    this.transactionAmounts = null;
    this.erc20ContractAddresses = null;
    this.timeStamp = null;
    this.value = null;
    this.isError = false;
    this.transactionInput = null;
  }
}

module.exports = Transaction;