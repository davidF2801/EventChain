import { Router } from 'express';
import { collections } from '../../services/databaseService';
import UserModel from '../../models/userModel';
import bcrypt from 'bcryptjs'; // Ensure bcryptjs is installed for password hashing
import jwt from 'jsonwebtoken'
import TronWeb from 'tronweb';
import dotenv from 'dotenv';
import getTicketOwner from '../../services/validationService';
import TicketModel from '../../models/ticketModel';
dotenv.config();


const router = Router();

function getRandomNumberBasedOnTime(): number {
  const timestamp = Date.now(); // Get the current timestamp
  const seed = timestamp % 1000; // Use the last 3 digits of the timestamp as the seed

  // Use a pseudo-random number generator with the seed
  const randomNumber = Math.floor(Math.random()*seed * (100000 + 1));

  return randomNumber;


}

async function deleteAccessNumber(ticketId: number): Promise<void> {

  const delayInMilliseconds = 30000;
  setTimeout(async () => {
    console.log('Timer expired!');
    const ticket = await TicketModel.findOne({ticketId});
    ticket!.accessNumber = -1;
    await ticket!.save();

  }, delayInMilliseconds);
}

router.post('/', async (req, res) => {
  try {
    const { ticketId, signature, currentNumber} = req.body;

    const ticket = await TicketModel.findOne({ ticketId });

    if (ticket?.accessNumber != currentNumber) {
      res.status(401).json({ error: 'Invalid number' });
      return;
    }

    const owner = await getTicketOwner(ticketId, ticket!.contractAddress)
    
    const isValid = TronWeb.Trx.verifyMessageV2(signature,ticket!.contractAddress);

    if (isValid){
      res.status(200).json({ message: 'User validated' });
    } else {
      res.status(401).json({ error: 'Invalid signature' });
    }

  } catch (error) {
    console.error('Login error:', error);
  }
});

router.post('/requestNumber', async (req, res) => {
  try {
    const { ticketId } = req.body;
    const number = getRandomNumberBasedOnTime();
    console.log('Number:', number);
    console.log('TicketId:', ticketId);
    const ticket = await TicketModel.findOne({ ticketId });
        
    if (!ticket) {
        console.error('Ticket not found');
        return;
    }
    
    ticket.accessNumber = number;

    await ticket.save();
    deleteAccessNumber(ticketId)

    res.status(200).json({number, message: 'Number requested' });
    

  } catch (error) {
    console.error('Login error:', error);
  }
});

//router.post('/logout', async (req, res) => {


export default router;