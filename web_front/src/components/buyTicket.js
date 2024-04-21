export const buyTicket = async (pk, buyerAccount) => {
  console.log("Buying ticket...");
  const contractAddress = "4120ea24d9eaad0e0604c06be45c12b66c7646d664";
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
