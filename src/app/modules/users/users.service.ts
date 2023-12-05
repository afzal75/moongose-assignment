import { Orders, UsersInterface } from "./users.interface";
import { UserModels } from "./users.models";

const creatUserIntoDb = async (user: UsersInterface) => {

  
  const result = await UserModels.create(user);
  return result;
};

const getAllUserFromDb = async () => {
  const result = await UserModels.aggregate([
    {
      $project: {
        age: 1,
        username: 1,
        fullName: 1,
        email: 1,
        address: 1,
        orders: 1,
      },
    },
  ]);
  return result;
};

const getSingleUserFromDb = async (id: string) => {
 
  const result = await UserModels.findOne({userId : id}, { userId: 1,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    isActive: 1,
    hobbies: 1,
    address: 1,})


  return result;
};


const getSingleOrdererFromDb = async (id: string) => {
  const result = await UserModels.aggregate([
    {
      $match: {
        userId: parseFloat(id),
      },
    },
    {
      $project: {
        orders: 1
      },
    },
  ]);
  return result;
};


const getTotalPriceOrdererFromDb = async (id: string) => {
  const result = await UserModels.aggregate([
    { $match: { userId: parseFloat(id) } }, 
    {
        $unwind: '$orders' 
    },
    {
      $group: {
        _id: null,
        totalCost: { $sum: { $multiply: ['$orders.price', '$orders.quantity'] } } 
    }
    }
]);
  return result;
};

const getUpdateUserData = async (
  id: string,
  updatedData: Partial<UsersInterface>
) => {
  const result = await UserModels.updateOne(
    { userId: parseFloat(id) },
    { $set: updatedData},
    {new: true}
  );

  return result;
};

const getOrderUpdateUserData = async (id: string, orderData: Orders) => {
  const result = await UserModels.updateOne(
    { userId: parseFloat(id) },
    { $push: { orders: orderData } }
  );

  return result;
};

const deleteSingleUserFromDb = async (id: string) => {
  const result = await UserModels.deleteOne({ userId: id });
  return result;
};

export const UsersService = {
  creatUserIntoDb,
  getAllUserFromDb,
  getSingleUserFromDb,
  getUpdateUserData,
  deleteSingleUserFromDb,
  getOrderUpdateUserData,
  getSingleOrdererFromDb,
  getTotalPriceOrdererFromDb
};
