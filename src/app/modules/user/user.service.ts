import { TOrder, TUser } from './user.interface';
import { User } from './user.models';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId.toString())) {
    throw new Error('User already exists!');
  }
  const result = await User.create(userData);
  return result;
};

const allUsers = async () => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (userId: string) => {
  const result = await User.findOne({ userId });
  return result;
};

const updateUser = async (userId: string, userData: TUser) => {
  const result = await User.updateOne({ userId }, userData);
  return result;
};

const deleteUserFromDB = async (userId: string) => {
  const result = await User.updateOne({ userId }, { isDeleted: true });
  return result;
};

const createdOrder = async (userId: string, orderData: TOrder) => {
  try {
    const existingUser = await User.findOne({ userId });

    if (!existingUser) {
      throw new Error('User not found');
    }

    if (!existingUser.orders) {
      existingUser.orders = []; // Create 'orders' array if it doesn't exist
    }

    existingUser.orders.push(orderData); // Add new order to the 'orders' array

    const result = await existingUser.save();
    return result;
  } catch (err) {
    throw new Error('The orders does not exist');
  }
};

const getUserOrderFromDB = async (userId: string) => {
  try {
    if (await User.isUserExists(userId.toString())) {
      // throw new Error('User already exists!')
    } else {
      throw new Error('User not found!');
    }

    const existingUser = await User.findOne({ userId });

    if (!existingUser) {
      throw new Error('User not found');
    }

    if (!existingUser.orders || existingUser.orders.length === 0) {
      throw new Error('User has no orders');
    }

    const order_result = { orders: existingUser.orders };

    return order_result;
  } catch (err) {
    throw new Error('Orders does not exist');
  }
};

const getUserOrderTotalPrice = async (userId: string) => {
  try {
    const userExists = await User.isUserExists(userId.toString());
    if (!userExists) {
      throw new Error('User not found!');
    }

    const existingUser = await User.findOne({ userId });

    if (!existingUser) {
      throw new Error('User not found');
    }

    const orders = existingUser.orders || []; // Ensure 'orders' is an array or initialize to an empty array if undefined

    let totalPrice = 0;

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      if (order && order.price !== undefined && order.quantity !== undefined) {
        totalPrice += order.price * order.quantity;
      } else {
        throw new Error('Price or quantity is undefined for an order');
      }
    }

    return totalPrice;
  } catch (err) {
    throw new Error('Error getting user order');
  }
};

export const UserService = {
  createUserIntoDB,
  allUsers,
  getSingleUser,
  updateUser,
  deleteUserFromDB,
  createdOrder,
  getUserOrderFromDB,
  getUserOrderTotalPrice,
};
