import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    email : { type:String, unique:true },
    password : String,
    firstname : String,
    lastname : String
});

const adminSchema = new Schema({
    email : { type:String, unique:true },
    password : String,
    firstname : String,
    lastname : String
});

const courseSchema = new Schema({
    title : String,
    description : String,
    price : Number,
    imageurl : String,
    creatorid : ObjectId
});

const purchasedSchema = new Schema({
    userid : ObjectId,
    courseid : ObjectId
});

export const userModel = mongoose.model('users',userSchema);
export const adminModel = mongoose.model('admins',adminSchema);
export const courseModel = mongoose.model('courses',courseSchema);
export const purchasedModel = mongoose.model('purchased',purchasedSchema);
