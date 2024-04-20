const TronWeb = require('tronweb');
require('dotenv').config();
const fullNode = process.env.FULL_NODE;
const eventServer = process.env.EVENT_SERVER;
const privateKey = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const buyerAccount = process.env.TEST_ACCOUNT;

const tronWebInst = new TronWeb.TronWeb({
  
    fullNode: fullNode,
    solidityNode: fullNode,
    eventServer: eventServer,
    privateKey: privateKey,
  
});

tronWebInst.contract().at(contractAddress).then(contractInstance => {
    const ticketPrice = 10;
    contractInstance.buyTicket().send({
        from: buyerAccount,
        feeLimit: 100000000,
        callValue: ticketPrice,
        shouldPollResponse: true
    }).then(result => {
        console.log('Transaction successful:', result);
    }).catch(error => {
        console.error('Failed to buy ticket:', error);
    });
}).catch(error => {
    console.error('Failed to get contract instance:', error);
});