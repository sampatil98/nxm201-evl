const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const userSchema=mongoose.Schema({
    "name":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        unique:true,
        required:true
    },
    "password":{
        type:String,
        unique:true,
        required:true
    },
    "role":{
        type:String,
        enum:["seller","buyer"],
        require:true
    }
});

userSchema.pre("save",async function(next){
    try{
        const salt= await bcrypt.genSalt(5);
        const hashedpassword= await bcrypt.hash(this.password,salt);
        this.password=hashedpassword;
        
        next();

    }catch(err){
        next(err);
    }
});

const UserModel=mongoose.model("userdata",userSchema);

module.exports={UserModel};