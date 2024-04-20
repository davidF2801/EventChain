pragma solidity ^0.8.0;

contract Event {
    uint public totalTickets;
    uint public ticketPrice;
    uint public ticketsSold = 0;
    address public host;
    
    struct Ticket {
        uint ticketId;
        uint price;
        bool forSale;
    }
    
    mapping(uint => Ticket) public tickets;
    mapping(address => mapping(uint => uint)) public ownedTickets;
    
    event TicketCreated(uint ticketId);
    event TicketPurchased(address buyer);
    event TicketListedForResale(uint ticketId, uint price);
    event TicketOwnershipTransferred(uint ticketId, address from, address to);
    event LogTicket(uint ticketId, uint price, bool forSale);
    
    modifier onlyHost() {
        require(msg.sender == host, "Action restricted to event host.");
        _;
    }
    
    constructor(uint _totalTickets, address _host, uint _price) {
        totalTickets = _totalTickets;
        host = _host;
        ticketPrice = _price; // Set the ticket price
    }
    
    function checkTickets() public{
        Ticket memory ticket = tickets[0];
        emit LogTicket(ticket.ticketId, ticket.price, ticket.forSale);
    }

    function getTicketOwnership(address account, uint ticketId) public view returns(uint){
        return ownedTickets[account][ticketId];
    }

    function createTicket() public{
        require(ticketsSold < totalTickets, "All tickets have already been created.");
        tickets[ticketsSold] = Ticket({
            ticketId: ticketsSold,
            price: ticketPrice,
            forSale: false
        });

        ticketsSold++;
        // tickets.push(Ticket({
        //     ticketId: tickets.length,
        //     price: _price,
        //     forSale: false
        // }));

        emit TicketCreated(ticketsSold);
    }
    
    function buyTicket() public payable {
            Ticket storage ticket;

            createTicket();
            ticket = tickets[ticketsSold - 1];

            require(msg.value == ticket.price, "Incorrect payment amount.");

            payable(host).transfer(msg.value);

            ownedTickets[msg.sender][ticketsSold - 1] = 1; 
            emit TicketPurchased(msg.sender); 
        }

    
    function listTicketForResale(uint _ticketId, uint _price) public {
        require(_ticketId < ticketsSold, "Ticket does not exist.");
        Ticket storage ticket = tickets[_ticketId];
        
        ticket.forSale = true;
        ticket.price = _price;
        emit TicketListedForResale(_ticketId, _price);
    }

    function checkTicketForSale(uint ticketId) public view returns(bool){
        return tickets[ticketId].forSale;
    }

    function checkPrice(uint ticketId) public view returns(uint){
        return tickets[ticketId].price;
    }
    
    function transferTicket(uint _ticketId, address _to) public {
        require(_ticketId < ticketsSold, "Ticket does not exist.");
        ownedTickets[_to][_ticketId] = 1; // Record the ownership
        emit TicketOwnershipTransferred(_ticketId, msg.sender, _to);
    }
    
    // function updateEventDetails(string memory _eventName, uint _eventDate, string memory _location) public onlyHost {
    //     location = _location;
    //     emit EventUpdated(_eventName, _eventDate, _location);
    // }
}
