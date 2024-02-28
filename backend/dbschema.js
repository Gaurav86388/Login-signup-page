import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password:{type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type:String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true},
    contact: {type: Number, required: true},
})

const user = mongoose.model("User", userSchema)

export {user}