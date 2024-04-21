export const buyTicket = async (pk, buyerAccount) => {
  console.log("Buying ticket...");
  const contractAddress = "4100a6feefd395212d6abb14446ec3b140a936062c";
  const tronWebInst = window.tronWeb;
  tronWebInst.setPrivateKey(pk);
  tronWebInst
    .contract()
    .at(contractAddress)
    .then((contractInstance) => {
      const ticketPrice = 10;
      contractInstance
        .buyTicket()
        .send({
          from: buyerAccount,
          feeLimit: 100000000,
          callValue: ticketPrice,
          shouldPollResponse: true,
        })
        .then((result) => {
          console.log("Transaction successful:", result);
        })
        .catch((error) => {
          console.error("Failed to buy ticket:", error);
        });
    })
    .catch((error) => {
      console.error("Failed to get contract instance:", error);
    });
};
