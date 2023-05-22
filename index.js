const express=require("express");
const {connection}=require("./config/db");
const {userRouter}=require("./routs/user.router");

const app= express();
app.use(express.json());

app.use(userRouter);

app.listen(8080,async()=>{
    try{
        await connection;
        console.log("connected to DB");
        console.log("server is running on port 8080");
    }catch(err){
        console.log(err)
    }

})