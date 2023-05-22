const mongoose=require("mongoose");

const connection=mongoose.connect("mongodb+srv://sambhaji:sambhaji@cluster0.xgl9wfz.mongodb.net/nxm201?retryWrites=true&w=majority");

module.exports={connection};