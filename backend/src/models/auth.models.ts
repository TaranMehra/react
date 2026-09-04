import { Schema, model } from "mongoose";

export interface IUser extends Document{
    username:string,
    email:string,
    phoneno:string,
    password:string,
    refreshToken?:string,
};

const  userSchema = new Schema<IUser>({
    username: {type:String, required: true},
    email: {type:String, required: true},
    phoneno: {type:String, required:true},
    password:{type:String, required:true},
    refreshToken:{type:String, default: null},
});

export const userModel = model<IUser>('User', userSchema);
