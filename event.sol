pragma solidity ^0.8.0;

contract Event {
    string public eventName;
    uint public eventDate;
    string public location;
    uint public totalTickets;
    uint public ticketsSold = 0;
    address public host;
    
    struct Ticket {
        uint ticketId;
        address owner;
        uint price;
        bool forSale;
    }
    
    Ticket[] public tickets;
    mapping(address => uint[]) public ownedTickets;
    
    event TicketCreated(uint ticketId, uint price);
    event TicketPurchased(address buyer, uint ticketId);
    event TicketListedForResale(uint ticketId, uint price);
    event EventUpdated(string eventName, uint eventDate, string location);
    event TicketOwnershipTransferred(uint ticketId, address from, address to);
    
    modifier onlyHost() {
        require(msg.sender == host, "Action restricted to event host.");
        _;
    }
    
    constructor(string memory _eventName, uint _eventDate, string memory _location, uint _totalTickets, address _host) {
        eventName = _eventName;
        eventDate = _eventDate;
        location = _location;
        totalTickets = _totalTickets;
        host = _host;
    }
    
    function createTicket(uint _price) public onlyHost {
        require(tickets.length < totalTickets, "All tickets have already been created.");
        tickets.push(Ticket({
            ticketId: tickets.length,
            owner: address(this),
            price: _price,
            forSale: false
        }));
        emit TicketCreated(tickets.length - 1, _price);
    }
    
    function buyTicket(uint _ticketId) public payable {
        require(_ticketId < tickets.length, "Ticket does not exist.");
        Ticket storage ticket = tickets[_ticketId];
        require(ticket.forSale, "Ticket not for sale.");
        require(msg.value == ticket.price, "Incorrect payment amount.");
        
        // Transfer ownership and funds
        ticket.owner = msg.sender;
        ticket.forSale = false;
        ticketsSold++;
        payable(host).transfer(msg.value);
        
        ownedTickets[msg.sender].push(_ticketId);
        emit TicketPurchased(msg.sender, _ticketId);
    }
    
    function listTicketForResale(uint _ticketId, uint _price) public {
        require(_ticketId < tickets.length, "Ticket does not exist.");
        Ticket storage ticket = tickets[_ticketId];
        require(ticket.owner == msg.sender, "You do not own this ticket.");
        
        ticket.forSale = true;
        ticket.price = _price;
        emit TicketListedForResale(_ticketId, _price);
    }
    
    function transferTicket(uint _ticketId, address _to) public {
        require(_ticketId < tickets.length, "Ticket does not exist.");
        Ticket storage ticket = tickets[_ticketId];
        require(ticket.owner == msg.sender, "You do not own this ticket.");
        
        ticket.owner = _to;
        emit TicketOwnershipTransferred(_ticketId, msg.sender, _to);
    }
    
    function updateEventDetails(string memory _eventName, uint _eventDate, string memory _location) public onlyHost {
        eventName = _eventName;
        eventDate = _eventDate;
        location = _location;
        emit EventUpdated(_eventName, _eventDate, _location);
    }
}
