const TronWeb = require('tronweb');
require('dotenv').config();
const fullNode = process.env.FULL_NODE;
const eventServer = process.env.EVENT_SERVER;
const privateKey = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const testAccount = process.env.TEST_ACCOUNT;

//const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
const tronWebInst = new TronWeb.TronWeb({
  
    fullNode: fullNode,
    solidityNode: fullNode,
    eventServer: eventServer,
    privateKey: privateKey,
  
});
tronWebInst.contract().at(contractAddress).then(contractInstance => {
    contractInstance.getTicketOwnership(testAccount, 0).call().then(result => {
        console.log('Transaction successful for ownership:', result);
    }).catch(error => {
        console.error('Failed to buy ticket:', error);
    });
}).catch(error => {
    console.error('Failed to get contract instance:', error);
});

