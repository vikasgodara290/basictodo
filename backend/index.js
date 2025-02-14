import express from 'express';
import {TodosModel, UserModel} from './db.js';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();
const PORT = 3000 || process.env.PORT;
app.use(express.json());
app.use(cors());
const uri =  "mongodb+srv://4ytvoch:ZtS3sF0KzgKBOi0C@cluster0.s2ief.mongodb.net/basictodo";

mongoose
  .connect(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully.");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get('/todo', async (req, res) => {
    const todos = await TodosModel.find();
    
    res.json(todos);
})

app.post('/todo', async (req, res) => {
    const userId = req.body.userId;
    const todo = req.body.todo;

    await TodosModel.create({
        todo : todo,
        userId : userId
    })
    const todos = await TodosModel.find();
    res.json(todos);
})

app.delete('/todo', async (req, res) => {
    const id = req.query.id;
    await TodosModel.deleteOne({_id : id})
    const todos = await TodosModel.find();
    res.json(todos);
})

app.put('/todo', async (req, res) =>{
    const id = req.body.id;
    const todo = req.body.todo;
    const isDone = req.body.isDone;

    await TodosModel.updateOne({_id : id}, {todo : todo, isDone:isDone});
    const todos = await TodosModel.find();
    res.json(todos);
})

app.post('/login', async (req, res)=>{
  const username=req.body.email;
  const password=req.body.password;

  const response = await UserModel.findOne({username:username,password:password})
  if(response) return res.send('You are loged in successfully!')

  res.send('Please signup!');
})

app.post('/signup', async (req, res)=>{
  const username=req.body.email;
  const password=req.body.password;

  const response = await UserModel.findOne({username:username,password:password})
  if(response) return res.send('You are already a user!')

  await UserModel.create({
    username:username,
    password:password
  })
  res.send('You are successfully signed up!');
})

app.listen(PORT, () => {
    console.log(`your app listening on port http://localhost:${PORT}`);
})