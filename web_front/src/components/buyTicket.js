const TronWeb = require('tronweb');

function buyTicket(pk, buyerAccount) {

    console.log('Buying ticket...');
    const fullNode = "http://127.0.0.1:9090/";
    const eventServer = "http://127.0.0.1:9090/";
    const contractAddress = "41d7def177daf34a5057867658cec51e5762c7cd80";

    const tronWebInst = new TronWeb.TronWeb({
    
        fullNode: fullNode,
        solidityNode: fullNode,
        eventServer: eventServer,
        privateKey: pk    
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
}
export default buyTicket;
