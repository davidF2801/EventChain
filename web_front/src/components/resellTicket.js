export const resellTicket = async (
  pk,
  buyerAccount,
  contractAddress,
  ticketId
) => {
  console.log("Rebuying ticket...:", ticketId);
  console.log("Contract Address:", contractAddress);
  const tronWebInst = window.tronWeb;
  tronWebInst.setPrivateKey(pk);

  const contractInstance = await tronWebInst.contract().at(contractAddress);

  const ticket = await contractInstance.tickets(ticketId).call();
  console.log("Tickets:", ticket);
  const result = await contractInstance.rebuyTicket(ticketId).send({
    from: buyerAccount,
    feeLimit: 100000000,
    callValue: ticket.price,
    shouldPollResponse: true,
  });

  console.log("Ticket Price:", ticketPrice);
  console.log("Ticket Id:", ticketId);

  console.log("Transaction successful:", result);

  var ticketInfo = { ticketId: ticketId, ticketPrice: ticketPrice };
  return ticketInfo;
};
