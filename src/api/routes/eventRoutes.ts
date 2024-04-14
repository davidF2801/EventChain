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
        const event = req.body as Event;
        const result = await collections.events?.insertOne(event);
        result
            ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    } catch (error) {
        console.error(error);
    }
}); 

export default router;