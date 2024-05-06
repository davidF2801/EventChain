export const listTicketForResale = async (price, contractAddress, ticketId) => {
  try {
    console.log("Listing for resale ticket...:", ticketId);
    console.log("Contract Address:", contractAddress);
    const tronWebInst = window.tronWeb;

    const contractInstance = await tronWebInst.contract().at(contractAddress);
    const listedTicket = await contractInstance
      .listTicketForResale(ticketId, price * 1e6)
      .send({
        from: tronWebInst.address.fromPrivateKey(tronWeb.defaultPrivateKey),
        feeLimit: 100000000,
        shouldPollResponse: true,
      });
    const ticketPrice = await contractInstance.checkPrice(ticketId).call();
    console.log("Transaction successful:", ticketPrice);
    return ticketPrice;
  } catch (error) {
    console.error("Transaction failed:", error);
    const ticketPrice = null;
    return ticketPrice;
  }
};
