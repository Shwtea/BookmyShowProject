const authRouter = require("./routes/auth.js");
const cinemaRouter = require("./routes/cinema");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const DB = "mongodb+srv://shwetagupta0711754:shwetagupta@cluster0.szemzdm.mongodb.net/?retryWrites=true&w=majority";
app.use(express.json());
app.use(authRouter);
app.use(cinemaRouter);

mongoose.connect(DB).then(() =>{
    console.log("connected successfully");
}).catch(err =>{
    console.log(err);
});

app.listen(PORT , "0.0.0.0" , function(err){
    if(!err)
    {
        console.log(`Connected at ${PORT}`);
    }
});