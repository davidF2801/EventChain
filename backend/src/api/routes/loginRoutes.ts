import { Router } from 'express';
import { collections } from '../../services/databaseService';
import UserModel from '../../models/userModel';
import bcrypt from 'bcryptjs'; // Ensure bcryptjs is installed for password hashing
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv';
dotenv.config();


const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: 'User not found\n' });
    }
    const salt = user.salt;
    const hashed_password = await bcrypt.hash(password, salt);
    //const isMatch = await bcrypt.compare(password, user.password);
    if (hashed_password==user.password) {
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      const secret: string = process.env.SECRET ?? "";
      const token = jwt.sign(userForToken, secret,  {expiresIn: 60*60*24 })
      console.log(token)

      res.status(200).json({ token, message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
  }
});

//router.post('/logout', async (req, res) => {


export default router;