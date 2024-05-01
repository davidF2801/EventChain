import { Router } from 'express';
import { collections } from '../../services/databaseService';
import EventModel from '../../models/eventModel';
import deployEvent from '../../services/eventService';
import jwt from 'jsonwebtoken'
import getTokenFrom from '../validators/token_handling';

const router = Router();


router.get('/', async (req, res) => {
    try {
        // const secret: string = process.env.SECRET ?? "";
        // const token: string | null = getTokenFrom(req);
        // console.log(token)
        // if (token == null) {
        //   return res.status(401).json({ error: 'no token in the call' })
        // } 
        // console.log(token)
        // const decodedToken = jwt.verify(token!, secret)
        // console.log(decodedToken)
        // if (!decodedToken)
        // {
        //   return res.status(401).json({ error: 'token invalid' })
        // }
        const events = (await EventModel.find({}));
        res.status(200).send(events);
    } catch (error) {
        console.error(error);
    }
});
router.post('/details', async (req, res) => {
  const {title} = req.body;
  try {
      const event = await EventModel.findOne({title});
      if (event) {
          res.send(event);
      } else {
          res.status(404).send('Event not found');
      }
  } catch (error) {
      console.error(error);
      //res.status(500).json({ error: 'Error finding ticket', message: error.message });
  }
});

// In your EventRoutes file (backend)
// router.get('/', (req, res) => { // Changed from '/:id' to '/'
//   const { title } = req.query; // Accessing title passed as a query parameter
//   if (title) {
//        const event =  EventModel.find({title: title}).exec();
//       // Here, you would ideally fetch and return the event details by title.
//       // This is a placeholder example. Adjust according to your database or data handling logic.
//       res.send(`Event details for title: ${title}`);
//   } else {
//       res.status(400).send("Title parameter is missing");
//   }
// });

//TODO: Test with frontend
router.post('/createEvent', async (req, res) => {
    try {
        const { title, description,location, startDate, endDate,type, image, address, price, nTickets, allowResale,resaleFee,maxPrice} = req.body;
        console.log(price);
        const trxSun = 1000000;
        const sunAmount = price * trxSun;
        console.log(sunAmount);
        const contractAddress = await deployEvent(address,nTickets,sunAmount, allowResale, resaleFee)
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
            contractAddress,
            price,
            nTickets,
            allowResale,
            resaleFee,
            maxPrice
          });
        new_event.save()
          .then(result => {
            // Envía una respuesta de éxito al cliente
            res.status(201).json({
              message: 'Event created and contract deployed',
              event: new_event,
              contractAddress: contractAddress
            });     
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