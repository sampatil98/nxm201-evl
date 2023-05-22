const mongoose=require("mongoose");

const blacklisSchema=mongoose.Schema({
    "token":{
        type:String,
        required:true,
        unique:true
    }
});

const blacklistModel=mongoose.model("blacklist",blacklisSchema);

module.exports={blacklistModel};