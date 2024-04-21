import { Router } from 'express';
import { collections } from '../../services/databaseService';
import UserModel from '../../models/userModel';
import bcrypt from 'bcryptjs'; // Ensure bcryptjs is installed for password hashing



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
/*
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
  }
});
*/

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    //const isMatch = await bcrypt.compare(password, user.password);
    if (password==user.password) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
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