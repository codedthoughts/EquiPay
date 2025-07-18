import express from 'express';
import { getAllUsers, addUser } from '../controllers/userController.js';

const router = express.Router();

router.route('/users')
    .get(getAllUsers)
    .post(addUser);

export default router;