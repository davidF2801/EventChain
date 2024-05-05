import { buyTicket } from "./buyTicket.js";
import { resellTicket } from "./resellTicket.js";

const handleBuy = async (eventInfo, isAuthenticated) => {
  try {
    if (!eventInfo.startDate) {
      const ticketInfo = await resellTicket(
        eventInfo.contractAddress,
        eventInfo.ticketId
      );
      const updateResponse = await fetch(
        "http://localhost:8888/tickets/rebuyTicket",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + isAuthenticated,
          },
          body: JSON.stringify({
            contractAddress: ticketInfo.contractAddress,
            ticketId: ticketInfo.ticketId,
            forSale: false,
            price: ticketInfo.ticketPrice._hex,
          }),
        }
      );
      const updateResult = await updateResponse.json();
      if (updateResponse.ok) {
        console.log("Ticket updated successfully in database:", updateResult);
      } else {
        throw new Error(
          updateResult.error || "Failed to update ticket in the database"
        );
      }
    } else {
      const ticketInfo = await buyTicket(eventInfo.contractAddress);
      console.log("Ticket Info:", ticketInfo);
      const ticketData = {
        eventName: eventInfo.title,
        forSale: false,
        ticketId: ticketInfo.ticketId,
        price: ticketInfo.ticketPrice._hex,
        contractAddress: eventInfo.contractAddress,
      };
      console.log(isAuthenticated);
      fetch("http://localhost:8888/tickets/createTicket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + isAuthenticated,
        },
        body: JSON.stringify(ticketData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("Ticket created successfully:", data);
          } else {
            throw new Error(data.error || "Failed to create ticket");
          }
        })
        .catch((error) => {
          console.error("Error when creating ticket:", error.message || error);
        });
    }
  } catch (error) {
    console.error("Error buying ticket:", error.message || error);
  }
};

export default handleBuy;
