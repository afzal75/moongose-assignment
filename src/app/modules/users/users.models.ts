import { Schema, model } from "mongoose";
import { Adress, FullName, Orders, UsersInterface,  } from "./users.interface";
import bcrypt from "bcrypt";


const FullNameSchema = new Schema<FullName>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
})


const AdressSchema = new Schema<Adress>({
    street: {type: String},
    city: {type: String},
    country: {type: String}
})
export const OrdersSchema = new Schema<Orders>(
    {
        productName: {type: String},
        price: {type: Number},
        quantity: {type: Number}
    }
)
const UserSchema = new Schema<UsersInterface>({
    userId: {type: Number, unique: true, required: true},
    username: {type: String},
    password: {type: String},
    fullName: FullNameSchema,
    age: {type: Number},
    email: {type: String},
    isActive: {type: Boolean},
    hobbies: {
        type: [String],
    },
    address:AdressSchema,
    orders: OrdersSchema
})


UserSchema.pre<UsersInterface>("save", async function (next) {
   
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
    console.log(error);
    }
});

export const UserModels = model<UsersInterface>("User", UserSchema)