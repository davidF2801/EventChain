pragma solidity ^0.8.0;


contract Event{
    struct Ticket{

        # Event event
        # User owner:
        float price;
        int ticketId;
        string description;
        bool reSale;

    }

    mapping (address => ticket[]) public tickets;
    mapping (address => ticket[]) public forSale;

    event Bought(address buyer, uint amount);

    error PaidAmountNotCorrect(float price);
    error EventDoesNotAllowResale();

    function buyTicket(Ticket ticket) external payable {
        if (msg.value != ticket.price)
            revert PaidAmountNotCorrect(ticket.price);
        tickets[msg.sender].push(ticket);
    }

    function resaleTicket(Ticket ticket) external {
        //TODO Optimize?
        //bool found = False;
        //sender_tickets = tickets[msg.sender]
        
        //for (uint i=0; i < sender_tickets.length; i++)
        //    if (tickets[i] == ticket)
        //        found = True;
        //        break;
        
        if ticket.reSale == True
            forSale[msg.sender].push(ticket);
        else
            revert EventDoesNotAllowResale();
        
        
    }
}