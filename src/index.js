// File: blockchain-integration.js
// A basic Blockchain Integration package using web3.js

const Web3 = require('web3');

class BlockchainIntegration {
  constructor(providerUrl) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
  }

  async getAccountBalance(address) {
    try {
      const balance = await this.web3.eth.getBalance(address);
      return this.web3.utils.fromWei(balance, 'ether');
    } catch (error) {
      throw new Error(`Error getting account balance: ${error.message}`);
    }
  }

  async sendTransaction(from, to, value) {
    try {
      const gasPrice = await this.web3.eth.getGasPrice();
      const transactionObject = {
        from,
        to,
        value: this.web3.utils.toWei(value.toString(), 'ether'),
        gas: 21000,
        gasPrice,
      };

      const signedTransaction = await this.web3.eth.accounts.signTransaction(
        transactionObject,
        'your-private-key'
      );

      const transactionReceipt = await this.web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
      );

      return transactionReceipt;
    } catch (error) {
      throw new Error(`Error sending transaction: ${error.message}`);
    }
  }
}

module.exports = BlockchainIntegration;
