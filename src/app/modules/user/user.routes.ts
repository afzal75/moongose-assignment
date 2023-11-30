import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
router.get('/:userId', UserController.getSingleUser);
router.put('/:userId', UserController.updateUser);
router.put('/:userId/orders', UserController.createOrders);
router.post('/', UserController.createUser);
router.get('/', UserController.allUsers);
router.delete('/:userId', UserController.deleteUser);

export const UserRoutes = router;
