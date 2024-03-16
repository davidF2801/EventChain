"""Juanka guapo"""


struct ticket{

    # Event event
    # User owner:
    float price;
    int ticketId;
    string description;
    bool forSale;

}

uint256 public ticketId;

mapping (unit256 => Ticket) public tickets;