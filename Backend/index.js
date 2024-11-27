const express = require("express");
const GoogleGenerativeAI = require('@google/generative-ai')
const userModel = require("./Models/userModel")
const expenseModel = require("./Models/expenseModel")
const bcrypt = require ("bcrypt")
const JWT = require("jsonwebtoken");
const cors = require("cors")
const cookieParser = require("cookie-parser");
const verifyToken = require("./Middlewares/verifyToken");
const fs = require("fs");
const path = require("path");
const {parse} = require("json2csv")
const {connectDB} = require('./Models/database')
const {call} = require('./gemeni')
require('dotenv').config()


const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(
    cors({
        origin: `${process.env.Frontend_URL}`, // Replace with your frontend URL
        credentials: true, // Allow credentials (cookies) to be included
    })
);


app.get("/", (req, res) => {
  res.send("server running...")
});

//sends user data
app.get("/getUserData",verifyToken, async (req, res) => {
    try{
        let user = req.user;
        // console.log(user);
        let DBuser = await userModel.findOne({email:user.email});
        if(!DBuser) res.status(404).send("something went wrong...")  
        else{
            DBuser.password= '';
          res.status(200).send(DBuser)
        }
    }
    catch(err){
        console.log(err.message);
    }
});

//sends expense data of particular user
app.get("/getExpenseData", verifyToken, async(req, res) => {
  try{
    let user = req.user;
    if(user){
        const DBuser = await userModel.findOne({email:user.email})
        if(DBuser){
            // console.log(DBuser);
            const list = await expenseModel.find({user_id:DBuser._id})
            // console.log(list);
            if(list) res.status(200).send(list);
        }
    }
    else{
        res.status(404).send("No user found...")
    }
  }
  catch(err){
      console.log(err);
  }

});

//register's user in the database
app.post("/register",async (req, res) => {
    try{
        const {name,email,password} = req.body;
        let user = await userModel.findOne({email});
        if(user){
            res.send("user already exists");
        }
        else{
            bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt,async  (err, hash) => {
                if (err) throw err;
                //creates user in database with encrypted password
                const user  = await userModel.create({
                name,
                email,
                password:hash,
                })
                // console.log(user)
            });
            });
          res.status(200).send("user created");
        }
    }
    catch(err){
        console.log(err.message);
    }     
});

//sets jwt token in cookie and verifys the user
app.post("/login",async (req,res)=>{
    try{

        let {email,password}=req.body;
        if(!email || !password){
            return res.send("pls enter valid input")
        }
        let user = await userModel.findOne({email});
        if(!user){
            return res.send("something went wrong...")
        }
        bcrypt.compare(password, user.password, async (err, result) => {
            if (err) throw err;
            // console.log(result);
            if(!result){
                res.send("something went wrong")
            }else{
                const Token = await JWT.sign({ email },process.env.JWT_SECRECT);
                res.json({Token});
            }
        });
        // console.log(user);
    }
    catch(err){
        console.log(err.message)
    }
});

//adds expense in data base
app.post("/newExpense",verifyToken,async (req,res)=>{
    try{
        let user = req.user;
        // console.log(user);
        let DBuser = await userModel.findOne({email:user.email})
        if(!DBuser) res.status(404).send("user not found");
        // console.log(DBuser.id);
        let{description,amount,category}=req.body;
        let expense = await expenseModel.create({
            description,
            amount,
            category,
            user_id:DBuser.id
        })
        // console.log(expense);
        res.status(200).send("expense created");
    }
    catch(err){
        console.log(err.message);
    }
});

app.get("/getExpenseData/:id", verifyToken,async (req, res) => {
    try{
        const id = req.params.id;
        //   console.log(id);
        if(!id){
            res.status(401).send("expense not found")
        }else{
            const expense = await expenseModel.findOne({_id:id})
            //   console.log(expense);
            if(!expense){
                res.status(401).send("expense not found")
            }else{
                res.send(expense)
            }
        }
    }
    catch(err){
        console.log(err)
    }
});

app.post("/updateExpenseData/:id",verifyToken,async (req, res) => {
    try{
        let data  = req.body.expenseData;
        if(!data){
          res.status(401).send("data not found ....")
        }
        let DBexpense = await expenseModel.findOneAndUpdate({_id:data._id},{
          description:data.description,
          amount:data.amount,
          category:data.category
        })

        res.status(200).send("Updated the DB");
    }
    catch(err){
        console.log(err);
    }
});

app.post('/deleteExpenseData/:id',verifyToken,async(req,res)=>{
    try{
        const id = req.params.id;
        if(!id){
            res.status(401).send("something went wrong.... :(")
        }
        let DBexpenseData = await expenseModel.findOneAndDelete({_id:id});
        // console.log(DBexpenseData);
        res.send("hello delete")
    }
    catch(err){
        console.log(err.message)
    }
})

app.get('/AIadvice',verifyToken,async (req,res)=>{
    try{
        let user = req.user
        // console.log(user);
        if(!user){
            res.status(401).send("user not found");
        }
        let DBuser = await userModel.findOne({email:user.email})
        if(DBuser){
            let expenseData = await expenseModel.find({user_id:DBuser._id})
            // console.log(expenseData)
            let AIadvice = await call(expenseData);
            if(AIadvice){
                res.send(AIadvice)
            }
        }
        // let expenseData = await expenseModel.find({user_id:user})

    }
    catch(err){
        console.log(err)
    }
})

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Server running on port ${port} 🔥`)});