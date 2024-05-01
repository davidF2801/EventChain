export const buyTicket = async (pk, buyerAccount, contractAddress) => {
  console.log("Buying ticket...");
  console.log("Contract Address:", contractAddress);
  const tronWebInst = window.tronWeb;
  tronWebInst.setPrivateKey(pk);

  const contractInstance = await tronWebInst.contract().at(contractAddress);

  const ticketPrice = await contractInstance.ticketPrice().call();

  console.log("Ticket Price:", ticketPrice);
  contractInstance.TicketPurchased().watch((err, event) => {
    if (err) {
      console.error("Error watching TicketPurchased events:", err);
    } else {
      console.log("TicketPurchased Event:", event);
    }
  });
  try {
    const result = await contractInstance.buyTicket().send({
      from: buyerAccount,
      feeLimit: 100000000,
      callValue: ticketPrice,
      shouldPollResponse: true,
    });
    console.log("Transaction submitted, check events for confirmation.");
  } catch (error) {
    console.error("Transaction failed:", error);
  }

  const ticketId = (await contractInstance.ticketsSold().call()) - 1;

  console.log("Ticket Id:", ticketId);

  var ticketInfo = { ticketId: ticketId, ticketPrice: ticketPrice };
  return ticketInfo;
};
