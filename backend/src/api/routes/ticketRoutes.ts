import { Router } from 'express';
import TicketModel from '../../models/ticketModel';

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

router.post('/createTicket', async (req, res) => {
    try {
        const { eventName, user, forSale, ticketId, price, contractAddress } = req.body;

        const new_ticket = new TicketModel({
            eventName,
            user,
            forSale,
            ticketId,
            price,
            contractAddress
        });

        const result = await new_ticket.save()
        .then(result => {
            // Envía una respuesta de éxito al cliente
          })
          .catch(error => {
            // Envía una respuesta de error al cliente
            res.status(500).json({ error: 'Error when creating event', message: error.message });
          });
    } catch (error) {
        console.error(error);
        //res.status(500).json({ error: 'Error when creating ticket', message: error.message });
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
