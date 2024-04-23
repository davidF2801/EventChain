export const buyTicket = async (pk, buyerAccount, contractAddress) => {
  console.log("Buying ticket...");
  console.log("Contract Address:", contractAddress);
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
