import { Router } from 'express';
import { collections } from '../../services/databaseService';
import EventModel from '../../models/eventModel';


export const router = Router();


router.get('/', async (req, res) => {
    try {
        const events = (await collections.events?.find({}).toArray()) as Event[];
        res.status(200).send(events);
    } catch (error) {
        console.error(error);
    }
}); 

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