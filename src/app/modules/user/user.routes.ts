import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
router.get('/:userId', UserController.getSingleUser);
router.post('/', UserController.createUser);
router.get('/', UserController.allUsers);

export const UserRoutes = router;
