export const resellTicket = async (contractAddress, ticketId) => {
  try {
    console.log("Rebuying ticket...:", ticketId);
    console.log("Contract Address:", contractAddress);
    const tronWebInst = window.tronWeb;

    const contractInstance = await tronWebInst.contract().at(contractAddress);

    const ticketPrice = await contractInstance.checkPrice(ticketId).call();
    console.log("Ticket price:", ticketPrice._hex);
    const result = await contractInstance.rebuyTicket(ticketId).send({
      from: tronWebInst.address.fromPrivateKey(tronWeb.defaultPrivateKey),
      feeLimit: 100000000,
      callValue: ticketPrice,
      shouldPollResponse: true,
    });
    // const message = tronWebInst.toHex(contractAddress.toString());
    // const signature = await tronWebInst.trx.sign(message, pk);
    // const isVerified = await tronWebInst.trx.verifyMessage(
    //   message,
    //   buyerAccount,
    //   true
    // );
    console.log("Ticket Id:", ticketId);
    console.log("Ticket Price:", ticketPrice);
    console.log("Ticket Id:", ticketId);
    console.log("Transaction successful:", result);
    var ticketInfo = {
      ticketId: ticketId,
      ticketPrice: ticketPrice,
      contractAddress: contractAddress,
    };
  } catch (error) {
    console.error("Transaction failed:", error);
    ticketInfo = null;
  }
  return ticketInfo;
};
