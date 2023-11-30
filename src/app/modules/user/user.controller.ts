/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userValidation } from './user.validation';
import { UserService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const users = req.body;

    const zodParsedData = userValidation.parse(users);

    const result = await UserService.createUserIntoDB(zodParsedData);

    if (!result) {
      throw new Error('error happened');
    }
    const { password, ...userPassword } = result.toObject();

    res.status(200).json({
      success: true,
      message: 'User created succesfully!',
      data: userPassword,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const allUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.allUsers();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getSingleUser(userId);

    res.status(200).json({
      success: true,
      message: 'Single User fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const result = await UserService.updateUser(userId, userData);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserService.deleteUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

const createOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { productName, price, quantity } = req.body;

    const orderData = {
      productName,
      price,
      quantity,
    };

    await UserService.createdOrder(userId, orderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong while updating data',
      error: err,
    });
  }
};

export const UserController = {
  createUser,
  allUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createOrders,
};
