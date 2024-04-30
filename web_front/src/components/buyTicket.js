export const buyTicket = async (pk, buyerAccount, contractAddress) => {
  console.log("Buying ticket...");
  console.log("Contract Address:", contractAddress);
  const tronWebInst = window.tronWeb;
  tronWebInst.setPrivateKey(pk);

  const contractInstance = await tronWebInst.contract().at(contractAddress);

  const ticketPrice = await contractInstance.ticketPrice().call();

  console.log("Ticket Price:", ticketPrice);

  const result = await contractInstance.buyTicket().send({
    from: buyerAccount,
    feeLimit: 100000000,
    callValue: ticketPrice,
    shouldPollResponse: true,
  });

  console.log("Transaction successful:", result);

  const ticketId = (await contractInstance.ticketsSold().call()) - 1;

  console.log("Ticket Id:", ticketId);

  var ticketInfo = { ticketId: ticketId, ticketPrice: ticketPrice };
  return ticketInfo;

  // tronWebInst
  //   .contract()
  //   .at(contractAddress)
  //   .then((contractInstance) => {
  //     const ticketPrice_fin = contractInstance.ticketPrice().call().then((result) => {
  //       const ticketPrice = result;
  //       console.log("Ticket Price:", ticketPrice);

  //       contractInstance
  //       .buyTicket()
  //       .send({
  //         from: buyerAccount,
  //         feeLimit: 100000000,
  //         callValue: ticketPrice,
  //         shouldPollResponse: true,
  //       })
  //       .then((result) => {
  //         console.log("Transaction successful:", result);
  //       })
  //       .catch((error) => {
  //         console.error("Failed to buy ticket:", error);
  //       });
  //   })
  //   .catch((error) => {
  //     console.error("Failed to get contract instance:", error);
  //   });
  //     });
};
