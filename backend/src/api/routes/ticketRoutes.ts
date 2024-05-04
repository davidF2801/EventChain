import { Router } from 'express';
import TicketModel from '../../models/ticketModel';
import getTokenFrom from '../validators/token_handling';
import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken';


const router = Router();

router.get('/', async (req, res) => {
    try {
        const tickets = await TicketModel.find({});
        res.status(200).send(tickets);
    } catch (error) {
        console.error(error);
        //res.status(500).json({ error: 'Error retrieving tickets', message: error.message });
    }
});

// router.get('/:id', async (req, res) => {
//     try {
//         const ticket = await TicketModel.findById(req.params.id);
//         if (ticket) {
//             res.send(ticket);
//         } else {
//             res.status(404).send('Ticket not found');
//         }
//     } catch (error) {
//         console.error(error);
//         //res.status(500).json({ error: 'Error finding ticket', message: error.message });
//     }
// });

router.get('/resale', async (req, res) => {
    try {
        const ticket = await TicketModel.find({forSale: true}).exec();
        if (ticket) {
            res.send(ticket);
        } else {
            res.status(404).send('Ticket not found');
        }
    } catch (error) {
        console.error(error);
        //res.status(500).json({ error: 'Error finding ticket', message: error.message });
    }
});
router.get('/myTickets', async (req, res) => {
    try {
        const secret: string = process.env.SECRET ?? "";
        const token: string | null = getTokenFrom(req);
        if (token == null) {
          return res.status(401).json({ error: 'no token in the call' })
        } 
        const decodedToken = jwt.verify(token!, secret)
        const jwtPayload = decodedToken as JwtPayload
        if (!decodedToken)
        {
          return res.status(401).json({ error: 'token invalid' })
        }
        const ticket = await TicketModel.find({user: jwtPayload.username}).exec();
        if (ticket) {
            res.send(ticket);
        } else {
            res.status(404).send('Ticket not found');
        }
    } catch (error) {
        console.error(error);
        //res.status(500).json({ error: 'Error finding ticket', message: error.message });
    }
});
// Backend: EventRoutes
router.post('/details', async (req, res) => {
    const { contractAddress, user } = req.body; // Receive both contractAddress and publicKey from the request body
    try {
        const ticket = await TicketModel.findOne({ contractAddress: contractAddress, user:user }).exec();
        if (ticket) {
            res.send(ticket);
        } else {
            res.status(404).send('Ticket not found');
        }
    } catch (error) {
        console.error(error);
    }
  });
  

router.post('/createTicket', async (req, res) => {
    try {
        const { eventName, forSale, ticketId, price, contractAddress} = req.body;
        const secret: string = process.env.SECRET ?? "";
        const token: string | null = getTokenFrom(req);
        if (token == null) {
          return res.status(401).json({ error: 'no token in the call' })
        } 
        const decodedToken = jwt.verify(token!, secret)
        const jwtPayload = decodedToken as JwtPayload
        const user = jwtPayload.username

        const new_ticket = new TicketModel({
            eventName,
            user,
            forSale,
            ticketId,
            price,
            contractAddress,
        });

        const result = await new_ticket.save()
        .then(result => {
            // Envía una respuesta de éxito al cliente
          })
          .catch(error => {
            // Envía una respuesta de error al cliente
            res.status(500).json({ error: 'Error when creating ticket', message: error.message });
          });
    } catch (error) {
        console.error(error);
        //res.status(500).json({ error: 'Error when creating ticket', message: error.message });
    }
}); 

router.put('/updateTicket', async (req, res) => {  
    // Get the ticket ID from URL parameters
    const { contractAddress, ticketId, forSale, price } = req.body;  // Destructure the fields you want to update from the request body

    try {
        const result = await TicketModel.findOneAndUpdate(
            { contractAddress:contractAddress, ticketId: ticketId },  // Find a ticket by its ticketId
            { forSale: forSale, price: price },  // Update these fields in the ticket
            { new: true }  // Return the updated document
        );

        if (result) {
            res.status(200).json({ message: 'Ticket updated successfully', data: result });
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (error) {
        console.error(error);
        //res.status(500).json({ error: 'Error updating ticket', message: error.message });
    }
});


router.delete('/removeTicket', async (req, res) => {
  try {
      const { ticketId } = req.body;

      const result = await TicketModel.deleteOne({ ticketId: ticketId });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'No ticket found to delete' });
      }
      res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
      console.error(error);
      //res.status(500).json({ error: 'Error when removing ticket', message: error.message });
  }
}); 

export default router;
