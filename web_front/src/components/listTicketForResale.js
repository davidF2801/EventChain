export const listTicketForResale = async (
  pk,
  price,
  contractAddress,
  ticketId,
  buyerAccount
) => {
  console.log("Listing for resale ticket...:", ticketId);
  console.log("Contract Address:", contractAddress);
  const tronWebInst = window.tronWeb;
  tronWebInst.setPrivateKey(pk);

  const contractInstance = await tronWebInst.contract().at(contractAddress);
  const listedTicket = await contractInstance
    .listTicketForResale(ticketId, price)
    .send({
      from: buyerAccount,
      feeLimit: 100000000,
      shouldPollResponse: true,
    });
  const ticketPrice = await contractInstance.checkPrice(ticketId).call();
  console.log("Transaction successful:", ticketPrice);
  return ticketPrice;
};
