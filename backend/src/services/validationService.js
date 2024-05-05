const TronWeb = require('tronweb');
require('dotenv').config();

async function getTicketOwner(ticketId, contractAddress) {
  const fullNode = process.env.FULL_NODE;
  const eventServer = process.env.EVENT_SERVER;
  const privateKey = process.env.PRIVATE_KEY;
    const tronWebInst = new TronWeb.TronWeb({
      fullNode: fullNode,
      solidityNode: fullNode,
      eventServer: eventServer,
      privateKey: privateKey,
    });
    console.log('Connected to Shasta network!');
    const contract = await tronWebInst.contract().at(contractAddress);
    const owner = await contract.ticketOwners(ticketId).call()
    return owner;
  }
module.exports = getTicketOwner;
