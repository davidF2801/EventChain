// import('@noble/secp256k1').then(secp256k1 => {
//     // Use secp256k1 here
//  }).catch(error => {
//     console.error('Failed to load the secp256k1 module', error);
//  });
//import TronWeb from 'tronweb';
const TronWeb = require('tronweb');

const fullNode = 'http://127.0.0.1:9090';
const eventServer = 'http://127.0.0.1:9090';
const privateKey = 'f628b8278399357c746404b88ca46f84900e2bbc749e32dc398043da7c2d4ec9';
const contractAddress = '41b1215486a0fcbd0501ddfeac1bcaee05721c3b2e';
const testAccount = "TWXndSfgARhAxihFTzAgKxKqYTdYXqVi4E";


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
   const ticketId = 0; // Example ticket ID
   const ticketPrice = 10; // Ticket price in TRX


  contractInstance.getTicketOwnership(testAccount, ticketId).call().then(result => {
      console.log('Transaction successful:', result);
  }).catch(error => {
      console.error('Failed to buy ticket:', error);
  });
   // Buying a ticket
   contractInstance.buyTicket(ticketId).send({
       from: testAccount,
       feeLimit: 100000000,
       callValue: ticketPrice, // Convert TRX to Sun
       shouldPollResponse: true
   }).then(result => {
       console.log('Transaction successful:', result);
   }).catch(error => {
       console.error('Failed to buy ticket:', error);
   });
}).catch(error => {
   console.error('Failed to get contract instance:', error);
});