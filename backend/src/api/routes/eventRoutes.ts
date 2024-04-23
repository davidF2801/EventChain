import { Router } from 'express';
import { collections } from '../../services/databaseService';
import EventModel from '../../models/eventModel';
import deployEvent from '../../services/eventService';

const router = Router();


router.get('/', async (req, res) => {
    try {
        const events = (await EventModel.find({}));
        res.status(200).send(events);
    } catch (error) {
        console.error(error);
    }
});

router.get('/:id', (req, res) => {
    res.send(`User ${req.params.id} route!`);
});
//TODO: Test with frontend
router.post('/createEvent', async (req, res) => {
    try {
        const { title, description,location, startDate, endDate,type, image, uid, address} = req.body;
        const contractAddress = await deployEvent(address)
        .catch(error => {
          // Envía una respuesta de error al cliente
          res.status(500).json({ error: 'Error when creating event', message: error.message });
        });
        const new_event = new EventModel({
            title,
            description,
            location,
            startDate,
            endDate,
            type,
            image, 
            uid,
            contractAddress
          });
        new_event.save()
          .then(result => {
            // Envía una respuesta de éxito al cliente
          })
          .catch(error => {
            // Envía una respuesta de error al cliente
            res.status(500).json({ error: 'Error when creating event', message: error.message });
          });
               
          res.status(201).json({
            message: 'Event created and contract deployed',
            event: new_event,
            contractAddress: contractAddress
        });     


    } catch (error) {
        console.error(error);
    }
}); 

router.delete('/removeEvent', async (req, res) => {
  try {
      const { eventname } = req.body;

      EventModel.deleteOne({event: eventname})
        .then(result => {
          // Envía una respuesta de éxito al cliente
          res.status(201).json({ message: 'Event removed', user: result });
        })
        .catch(error => {
          // Envía una respuesta de error al cliente
          res.status(500).json({ error: 'Error when removing event', message: error.message });
        });

  } catch (error) {
      console.error(error);
  }
}); 

export default router;