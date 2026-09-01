import { Schema, model } from "mongoose";

export interface IUser extends Document{
    username:string,
    email:string,
    phoneno:string,
    password:string,
};

const  userSchema = new Schema<IUser>({
    username: {type:String, required: true},
    email: {type:String, required: true},
    phoneno: {type:String, requried:true},
    password:{type:String, requried:true}
});

export const userModel = model<IUser>('User', userSchema);
