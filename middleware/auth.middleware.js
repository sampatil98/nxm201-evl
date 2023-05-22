const jwt=require("jsonwebtoken");
const {UserModel}=require("../model/user.model");
const {blacklistModel}=require("../model/blacklist.model");

const auth= async (req,res,next)=>{
    try{

    
    const token= req.headers.authorization.split(" ")[1];

    const isblacklisted= await blacklistModel.findOne({token});

    if(isblacklisted){
        return res.status(401).send("token is blacklisted");
    }

    const decode=jwt.verify(token,"sambhaji");
    const email=decode.email;

    const user=await UserModel.find({email});

    if(!user){
        return res.status(401).send("unauthorised");
    }
    req.user=user;
    next();
 }catch(err){
    if(err.name==="TokenExpiredError"){
        return res.status(401).send("access token expired");
    }
    return res.status(401).send("unauthorised");
 }
};

module.exports={auth}