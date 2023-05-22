const {Router}=require("express");
const {UserModel}=require("../model/user.model");
const {blacklistModel}= require("../model/blacklist.model");
const {ProductModel}=require("../model/product.model");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const {auth}=require("../middleware/auth.middleware");

const userRouter=Router();

userRouter.post("/signup",async (req,res,next)=>{
    try{
        const {email}=req.body;
        let user= await UserModel.findOne({email});
        if(user){
            return res.status(400).send({"msg":"user already exist"});
        }

        let newuser= UserModel(req.body);
        await newuser.save();

        res.status(200).send({"msg":"user registered"});

    }catch(err){
        next(err);
    }
});

userRouter.post("/login", async (req,res,next)=>{
    try{
        const {email,password}=req.body;
        const user= await UserModel.findOne({email});
        if(!user){
            return res.status(400).send({"msg":"invalid user"});
        }
        const pass= await bcrypt.compare(password,user.password);

        if(!pass){
            return res.status(400).send({"msg":"wrong password"});
        }

        const token = jwt.sign({user:user},"sambhaji",{expiresIn:"1m"});

        const refreshtoken = jwt.sign({user:user},"sambhaji",{expiresIn:"5m"});

        res.status(200).send({"msg":"user loggedin","token":token,"refreshtoken":refreshtoken});

    }catch(err){
        next(err);
    }
});

userRouter.post("/logout",async(req,res)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        const blacklist= blacklistModel(token);
        await blacklist.save();

        res.status(200).send({"msg":"user loggedout"});

    }catch(err){
        console.error(err);
        req.status(500).send("server error")
    }
});

userRouter.get("/products",auth,async(req,res)=>{
    try{
        const data=await ProductModel.find();
        
        res.status(400).send({"data":data});

    }catch(err){
        res.status(400).send(err.messege)
    }
});

userRouter.post("/addproducts",auth,async(req,res)=>{
    try{
      
    const product= ProductModel(req.body);
    await product.save();

    res.status(200).send({"msg":"product added"});
        

    }catch(err){
        res.status(400).send(err);
    }
});

module.exports={userRouter};