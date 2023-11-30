import { TUser } from './user.interface';
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

export const UserService = {
  createUserIntoDB,
  allUsers,
  getSingleUser,
  updateUser,
};
