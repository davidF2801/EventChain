// import('@noble/secp256k1').then(secp256k1 => {
//     // Use secp256k1 here
//  }).catch(error => {
//     console.error('Failed to load the secp256k1 module', error);
//  });
//import TronWeb from 'tronweb';
const TronWeb = require('tronweb');
require('dotenv').config();

const fullNode = process.env.FULL_NODE;
const eventServer = process.env.EVENT_SERVER;
const privateKey = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const testAccount = process.env.TEST_ACCOUNT;
const secondBuyerAccount = process.env.SECOND_BUYER_ACCOUNT;
const privateKey2 = process.env.PRIVATE_KEY2;


//const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
const tronWebInst = new TronWeb.TronWeb({
  
    fullNode: fullNode,
    solidityNode: fullNode,
    eventServer: eventServer,
    privateKey: privateKey,
  
});
tronWebInst.isConnected().then(isConnected => {
   if(isConnected) {
     console.log("Connected successfully to Tron network");
   } else {
     console.error("Failed to connect to Tron network");
   }
 });

 tronWebInst.trx.getCurrentBlock().then(block => {
   console.log("Current Block:", block);
 }).catch(error => {
   console.error("Error getting current block:", error);
 });
 
// const contractAbi = require('./build/Event.json').abi;
// const contractAddress = 'YOUR_CONTRACT_ADDRESS';
//To get contract address
// Event.deployed().then(instance => {
//    console.log("Contract address:", instance.address);
//    console.log("Contract ABI:", JSON.stringify(instance.abi));
//  });

 tronWebInst.contract().at(contractAddress).then(contractInstance => {
   // Now you have the contract instance
   const ticketPrice = 10; // Ticket price in TRX
   // Buying a ticket
  //  contractInstance.buyTicket().send({
  //      from: testAccount,
  //      feeLimit: 100000000,
  //      callValue: ticketPrice, // Convert TRX to Sun
  //      shouldPollResponse: true
  //  }).then(result => {
  //      console.log('Transaction successful:', result);
  //  }).catch(error => {
  //      console.error('Failed to buy ticket:', error);
  //  });
  contractInstance.getTicketOwnership(secondBuyerAccount, 0).call().then(result => {
      console.log('Transaction successful for ownership:', result);
  }).catch(error => {
      console.error('Failed to buy ticket:', error);
  });

  // contractInstance.listTicketForResale(0, 100).send().then(result => {
  //     console.log('Transaction successful:', result);
  // }).catch(error => {
  //     console.error('Failed to buy ticket:', error);
  // });
  // contractInstance.checkTicketForSale(0).call().then(result => {
  //   console.log('Transaction successful:', result);
  // }).catch(error => {
  //     console.error('Failed to buy ticket:', error);
  // });
  // contractInstance.checkPrice(0).call().then(result => {
  //   console.log('Transaction successful:', result);
  }).catch(error => {
      console.error('Failed to buy ticket:', error);
  });



// const tronWebInst2 = new TronWeb.TronWeb({
  
//   fullNode: fullNode,
//   solidityNode: fullNode,
//   eventServer: eventServer,
//   privateKey: privateKey2,

// });

// tronWebInst2.contract().at(contractAddress).then(contractInstance => {
//  contractInstance.rebuyTicket(0).send({
//    from: secondBuyerAccount,
//    feeLimit: 100000000,
//    callValue: 100,
//    shouldPollResponse: true
// }).then(result => {
//    console.log('Transaction successful for rebuying:', result);
// }).catch(error => {
//    console.error('Failed to rebuy ticket:', error);
// });

// }).catch(error => {
//   console.error('Failed to get contract instance:', error);
// });