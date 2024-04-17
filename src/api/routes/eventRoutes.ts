import { Router } from 'express';
import { collections } from '../../services/databaseService';
import EventModel from '../../models/eventModel';


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
router.post('/', async (req, res) => {
    try {
        const { title, description, startDate, endDate, location, image, uid} = req.body;

        const new_event = new EventModel({
            title,
            description,
            startDate,
            endDate,
            location,
            image, 
            uid
          });
        new_event.save()
          .then(result => {
            // Envía una respuesta de éxito al cliente
            res.status(201).json({ message: 'Event created', user: result });
          })
          .catch(error => {
            // Envía una respuesta de error al cliente
            res.status(500).json({ error: 'Error when creating event', message: error.message });
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