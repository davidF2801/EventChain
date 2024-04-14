import { Router } from 'express';
import { collections } from '../../services/databaseService';


const router = Router();


router.get('/', async (req, res) => {
    try {
        // const users = await collections.userModel.find({}).toArray();
    } catch (error) {
        console.error(error);
    }

});


router.get('/:id', (req, res) => {
    res.send(`User ${req.params.id} route!`);
});

export default router;