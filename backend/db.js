import mongoose from "mongoose";
const ObjectId = mongoose.ObjectId;
const todos = mongoose.Schema({
    todo : String,
    userId : ObjectId
})

const user = mongoose.Schema({
    username : String,
    password : String
})

const TodosModel = mongoose.model("todos",todos);
const UserModel = mongoose.model("user",user);

export  {
    UserModel,
    TodosModel
}
