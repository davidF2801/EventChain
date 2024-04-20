const TronWeb = require('tronweb');

fullNode = "http://127.0.0.1:9090"
eventServer = "http://127.0.0.1:9090"
contractAddress = "41ed3fbed9ab70293f45505becda86bd5ed87f5c10"

const tronWebInst = new TronWeb.TronWeb({
  
    fullNode: fullNode,
    solidityNode: fullNode,
    eventServer: eventServer,
    privateKey: privateKey,
  
});

tronWebInst.contract().at(contractAddress).then(contractInstance => {
    const ticketPrice = 10;
    contractInstance.buyTicket().send({
        from: testAccount,
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