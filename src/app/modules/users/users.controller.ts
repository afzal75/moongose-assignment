import { Request, Response } from "express";
import { UsersService } from "./users.service";
import {
  OrdersSchema,
  UsersInterfaceValidationSchema,
} from "./users.zod.validation";

const createUsers = async (req: Request, res: Response) => {
  try {

    const users = req.body;
    const zodParseData = UsersInterfaceValidationSchema.parse(users);
    const result = await UsersService.creatUserIntoDb(zodParseData);



    const {
      userId,
      username,
      fullName,
      age,
      email,
      isActive,
      hobbies,
      address,
    } = result;

    const resultOutPass = {
      userId,
      username,
      fullName,
      age,
      email,
      isActive,
      hobbies,
      address,
    };

    res.status(200).json({
      success: true,
      message: "User is created successfully",
      data: resultOutPass,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UsersService.getAllUserFromDb();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    

    const result = await UsersService.getSingleUserFromDb(userId);

    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};
const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UsersService.getSingleOrdererFromDb(userId);

    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};
const getTotalPriceOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UsersService.getTotalPriceOrdererFromDb(userId);

    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "user not found",
      error: {
        code: 404,
        description: "user not found"
      }
    });
  }
};
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const updatedData = req.body;

    await UsersService.getUpdateUserData(userId, updatedData);

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: updatedData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const updateOrderSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;
    const zodOrderValidate = OrdersSchema.parse(updatedData);
    await UsersService.getOrderUpdateUserData(userId, zodOrderValidate);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

   await UsersService.deleteSingleUserFromDb(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const UserController = {
  createUsers,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
  updateOrderSingleUser,
  getSingleOrder,
  getTotalPriceOrder
};
