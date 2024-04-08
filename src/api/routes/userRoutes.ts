import { Router } from 'express';


const router = Router();


router.get('/', (req, res) => {
    res.send("What's up doc ?!");
});


router.get('/:id', (req, res) => {
    res.send(`User ${req.params.id} route!`);
});

export default router;