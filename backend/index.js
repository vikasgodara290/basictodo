import express from 'express';
import {TodosModel, UserModel} from './db.js';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import ObjectId from 'mongoose'
const app = express();
const PORT = 3000 || process.env.PORT;
app.use(express.json());
app.use(cors());
const uri =  "mongodb+srv://4ytvoch:ZtS3sF0KzgKBOi0C@cluster0.s2ief.mongodb.net/basictodo";
const JWT_SECRET='fdjkIOi)7lkLKJLkjdsf(&*()dlfkslk'

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

async function auth(req, res, next) {
  const token = req.headers.token;
  const currentUser = jwt.verify(token, JWT_SECRET)
  console.log(currentUser);
  
  if(currentUser){
    req.headers.userId=currentUser.id;
    next()
  }
  else res.send('you are not authorized!')
}

app.get('/todo', auth, async (req, res) => {
    const currentUser = req.headers.userId;
    const todos = await TodosModel.find({userId:currentUser});
    
    res.json(todos);
})

app.post('/todo', auth, async (req, res) => {
    const todo = req.body.todo;
    const userId = req.headers.userId;

    await TodosModel.create({
        todo : todo,
        userId : userId
    })
    const todos = await TodosModel.find({userId:userId});
    res.json(todos);
})

app.delete('/todo', auth, async (req, res) => {
    const id = req.query.id;
    const userId = req.headers.userId;
    await TodosModel.deleteOne({_id : id})
    const todos = await TodosModel.find({userId:userId});
    res.json(todos);
})

app.put('/todo', auth, async (req, res) =>{
    const id = req.body.id;
    const todo = req.body.todo;
    const isDone = req.body.isDone;
    const userId = req.headers.userId;
    await TodosModel.updateOne({_id : id}, {todo : todo, isDone:isDone});
    const todos = await TodosModel.find({userId:userId});
    res.json(todos);
})

app.post('/login', async (req, res)=>{
  const username=req.body.email;
  const password=req.body.password;

  const response = await UserModel.findOne({username:username,password:password})
  
  if(response){
    const token = jwt.sign({
      id:response._id
    },JWT_SECRET)
    return res.json({token:token})
  }

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

  const res2 = await UserModel.findOne({username:username,password:password})
  console.log(res2);
  
  if(res2){
    const token = jwt.sign({
      id:res2._id
    },JWT_SECRET)
    res.json({token:token})
  }
})

app.get('/getUser', auth, async (req, res)=>{
  const userId = req.headers.userId;
  console.log(userId);
  
  const user = await UserModel.findOne({_id:userId})
  console.log(user);
  
  res.json({
    userEmail:user.username
  })
})

app.listen(PORT, () => {
    console.log(`your app listening on port http://localhost:${PORT}`);
})