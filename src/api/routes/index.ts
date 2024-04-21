import { Router } from 'express';
import homeRouter from './homeRoutes';
import usersRouter from './userRoutes';
import eventsRouter from './eventRoutes';
import loginRouter from './loginRoutes';

// Create a new Router instance
const router = Router();

// Mount the routers
router.use('/', homeRouter);
router.use('/users', usersRouter);
router.use('/login', loginRouter);
router.use('/events', eventsRouter);


export default router;