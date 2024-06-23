export const buyTicket = async (contractAddress) => {
  console.log("Buying ticket...");
  console.log("Contract Address:", contractAddress);
  const tronWebInst = window.tronWeb;
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
      from: tronWebInst.address.fromPrivateKey(tronWeb.defaultPrivateKey),
      feeLimit: 100000000,
      callValue: ticketPrice,
      shouldPollResponse: true,
    });
    console.log("Transaction submitted, check events for confirmation.");
    const ticketId = (await contractInstance.ticketsSold().call()) - 1;
    console.log("Ticket Id:", ticketId);

    var ticketInfo = {
      ticketId: ticketId,
      ticketPrice: ticketPrice,
    };
  } catch (error) {
    console.error("Transaction failed:", error);
    const ticketInfo = null;
    return ticketInfo;
  }

  return ticketInfo;
};
