import { Router } from 'express';
import { collections } from '../../services/databaseService';
import UserModel from '../../models/userModel';



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

//TODO: Test with frontend
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

export default router;