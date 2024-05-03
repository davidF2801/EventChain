import { Router } from 'express';
import { collections } from '../../services/databaseService';
import UserModel from '../../models/userModel';
import bcrypt from 'bcryptjs'; // Ensure bcryptjs is installed for password hashing
import getTokenFrom from '../validators/token_handling';
import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken';



const router = Router();


router.get('/', async (req, res) => {
    try {
        const users = (await UserModel.find({}));
        res.status(200).send(users);
    } catch (error) {
        console.error(error);
    }

});

router.get('/:id', (req, res) => {
    res.send(`User ${req.params.id} route!`);
});

router.post("/userInfo", async (req, res) => {
    try {
       const secret: string = process.env.SECRET ?? "";
        const token: string | null = getTokenFrom(req);
        if (token == null) {
          return res.status(401).json({ error: 'no token in the call' })
        } 
        const decodedToken = jwt.verify(token!, secret)
        const jwtPayload = decodedToken as JwtPayload
        if (!decodedToken)
        {
          return res.status(401).json({ error: 'token invalid' })
        }
        const user = await UserModel.find({username: jwtPayload.username}).exec();
        if (user) {
          res.send(user);
        } else {
            res.status(404).send('User not found');
        }

    } catch (error) {
      console.error(error);
    }
});


router.post('/', async (req, res) => {
    try {
        const { username, email, password, roles, profilePictureUrl} = req.body;

        const new_user = new UserModel({
            username,
            email,
            password,
            roles,
            profilePictureUrl
          });
        new_user.save()
          .then(result => {
            // Envía una respuesta de éxito al cliente
            res.status(201).json({ message: 'User created', user: result });
          })
          .catch(error => {
            // Envía una respuesta de error al cliente
            res.status(500).json({ error: 'Error when creating user', message: error.message });
          });

    } catch (error) {
        console.error(error);
    }
}); 

router.post('/updateUser', async (req, res) => {
  try {
      const { username, email } = req.body;
      const secret: string = process.env.SECRET ?? "";
        const token: string | null = getTokenFrom(req);
        if (token == null) {
          return res.status(401).json({ error: 'no token in the call' })
        } 
        const decodedToken = jwt.verify(token!, secret)
        const jwtPayload = decodedToken as JwtPayload
        if (!decodedToken)
        {
          return res.status(401).json({ error: 'token invalid' })
        }
        const user = await UserModel.find({username: jwtPayload.username}).exec();
        if (user) {
          user[0].username = username;
          user[0].email = email;
          await user[0].save();
          res.send(user);
        }
        else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
    }
}); 

router.delete('/removeUser', async (req, res) => {
  try {
      const { username } = req.body;

      UserModel.deleteOne({username: username})
        .then(result => {
          // Envía una respuesta de éxito al cliente
          res.status(201).json({ message: 'User removed', user: result });
        })
        .catch(error => {
          // Envía una respuesta de error al cliente
          res.status(500).json({ error: 'Error when removing user', message: error.message });
        });

  } catch (error) {
      console.error(error);
  }
}); 

export default router;