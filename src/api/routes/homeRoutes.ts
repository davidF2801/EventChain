import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    //Response
    res.send('Hello World!')
});

export default router;