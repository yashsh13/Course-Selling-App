import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    email : { type:String, required:true, unique:true},
    password : { type:String, required:true },
    firstname : String,
    lastname : String
});

const adminSchema = new Schema({
    email : { type:String, required:true, unique:true },
    password : { type:String, required:true },
    firstname : String,
    lastname : String
});

const courseSchema = new Schema({
    title : { type:String, required:true },
    description : String,
    price : { type:Number, required:true },
    imageurl : String,
    creatorid : { type:ObjectId, required:true, ref:'admins'}
});

const purchasedSchema = new Schema({
    userid : { type:ObjectId, required:true, ref:'users'},
    courseid : { type:ObjectId, required:true, ref:'courses'}
});

export const userModel = mongoose.model('users',userSchema);
export const adminModel = mongoose.model('admins',adminSchema);
export const courseModel = mongoose.model('courses',courseSchema);
export const purchasedModel = mongoose.model('purchased',purchasedSchema);
