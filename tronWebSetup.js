// import('@noble/secp256k1').then(secp256k1 => {
//     // Use secp256k1 here
//  }).catch(error => {
//     console.error('Failed to load the secp256k1 module', error);
//  });
//import TronWeb from 'tronweb';
const TronWeb = require('tronweb');

const fullNode = 'http://127.0.0.1:9090';
const eventServer = 'http://127.0.0.1:9090';
const privateKey = '27288f7b37be771bf99ab963659d917a8d911ff056f85c39b2deaf3a1002c76e';

//const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
const tronWebInst = new TronWeb.TronWeb({'fullHost': fullNode,'headers': { "TRON-PRO-API-KEY": privateKey }});
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

//To get contract address
// Event.deployed().then(instance => {
//    console.log("Contract address:", instance.address);
//    console.log("Contract ABI:", JSON.stringify(instance.abi));
//  });

//  const contractAddress = '418cdd87b68caa494aa026e6be1051c0864cb263d0';
//  tronWebInst.contract().at(contractAddress).then(contractInstance => {
//    // Now you have the contract instance
//    const ticketId = 0; // Example ticket ID
//    const ticketPrice = 10; // Ticket price in TRX

//    // Buying a ticket
//    contractInstance.buyTicket(ticketId).send({
//        from:'TDJuT9YGwG6jbdTZi8zypaucguFTtA5wq4',
//        feeLimit: 100000000,
//        callValue: tronWebInst.toSun(ticketPrice), // Convert TRX to Sun
//        shouldPollResponse: true
//    }).then(result => {
//        console.log('Transaction successful:', result);
//    }).catch(error => {
//        console.error('Failed to buy ticket:', error);
//    });
// }).catch(error => {
//    console.error('Failed to get contract instance:', error);
// });