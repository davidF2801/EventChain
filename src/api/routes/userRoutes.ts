import { Router } from 'express';
import { collections } from '../../services/databaseService';
import UserModel from '../../models/userModel';



const router = Router();


router.get('/', async (req, res) => {
    try {
        const users = (await collections.users?.find({}).toArray()) as User[];
        res.status(200).send(users);
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
        const user = req.body as User;
        const result = await collections.events?.insertOne(user);
        result
            ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    } catch (error) {
        console.error(error);
    }
}); 

export default router;