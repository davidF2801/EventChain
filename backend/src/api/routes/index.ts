import { Router } from 'express';
import homeRouter from './homeRoutes';
import usersRouter from './userRoutes';
import eventsRouter from './eventRoutes';
import loginRouter from './loginRoutes';
import ticketRouter from './ticketRoutes';
// Create a new Router instance
const router = Router();

// Mount the routers
router.use('/', homeRouter);
router.use('/users', usersRouter);
router.use('/login', loginRouter);
router.use('/events', eventsRouter);
router.use('/tickets', ticketRouter);

export default router;