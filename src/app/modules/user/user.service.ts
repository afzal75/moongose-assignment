import { TUser } from './user.interface';
import { User } from './user.models';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId.toString())) {
    throw new Error('User already exists!');
  }
  const result = await User.create(userData);
  return result;
};

export const UserService = {
  createUserIntoDB,
};
