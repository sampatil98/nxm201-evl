const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    "name":{
        type:String,
        required:true
    },
    "price":{
        type:Number,
        required:true
    },
    "description":{
        type:String,
        required:true
    },
    "catagory":{
        type:String,
        require:true
    }
});


const ProductModel=mongoose.model("productdata",productSchema);

module.exports={ProductModel};