pragma solidity ^0.8.0;

contract Event {
    uint public totalTickets;
    uint public ticketPrice;
    uint public ticketsSold = 0;
    uint public resaleFee; // Fee as a percentage of the sale price
    bool public allowResale;
    address public host;
    
    struct Ticket {
        uint ticketId;
        uint price;
        bool forSale;
    }
    
    mapping(uint => Ticket) public tickets;
    mapping(address => mapping(uint => uint)) public ownedTickets;
    mapping(uint => address) ticketOwners;
    event TicketCreated(uint ticketId);
    event TicketPurchased(address buyer);
    event TicketListedForResale(uint ticketId, uint price);
    event TicketOwnershipTransferred(uint ticketId, address from, address to);
    event LogTicket(uint ticketId, uint price, bool forSale);
    
    modifier onlyHost() {
        require(msg.sender == host, "Action restricted to event host.");
        _;
    }
    
    constructor(uint _totalTickets, address _host, uint _price, bool _allowResale, uint _resaleFee) {
        totalTickets = _totalTickets;
        host = _host;
        ticketPrice = _price; // Set the ticket price
        allowResale = _allowResale;
        resaleFee = _resaleFee;
    }
    
    function checkTickets() public{
        Ticket memory ticket = tickets[0];
        emit LogTicket(ticket.ticketId, ticket.price, ticket.forSale);
    }

    function getTicketOwnership(address account, uint ticketId) public view returns(uint){
        return ownedTickets[account][ticketId];
    }

    //TODO: cambiar ticketsSold para que no puedan tener dos tickets mismo id
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
        ticketOwners[ticketsSold - 1] = msg.sender;
        emit TicketPurchased(msg.sender); 
        }
    function rebuyTicket(uint _ticketId) public payable {
        require(_ticketId < ticketsSold, "Ticket does not exist."); // Ensures the ticket exists
        Ticket storage ticket = tickets[_ticketId];
        require(ticket.forSale, "This ticket is not for sale."); // Check if the ticket is available for sale
        require(msg.value == ticket.price, "Incorrect payment amount."); // Ensures the payment is correct

        // The original owner gets the payment
        address payable originalOwner = payable(ticketOwners[_ticketId]);
        uint resaleFeeAmount = msg.value * resaleFee / 100;
        uint paymentToOwner = msg.value - resaleFeeAmount;
        originalOwner.transfer(paymentToOwner);
        payable(host).transfer(resaleFeeAmount);
        // Update ownership mapping and mark the ticket as not for sale
        ownedTickets[originalOwner][_ticketId] = 0;
        ownedTickets[msg.sender][_ticketId] = 1;
        ticketOwners[_ticketId] = msg.sender;
        ticket.forSale = false;

        emit TicketPurchased(msg.sender); // Emit an event that the ticket has been purchased
    }

    function listTicketForResale(uint _ticketId, uint _price) public {
        //TODO: Hacer privado
        require(allowResale == true, 'Resale is not permitted for this event');
        require(_ticketId < ticketsSold, "Ticket does not exist.");
        require(ticketOwners[_ticketId] == msg.sender, "Caller is not the owner of the ticket"); 

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
