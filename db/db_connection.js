const mongoose= require("mongoose");

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   // do not use this  useCreateIndex:true
    
}).then(()=>{
    console.log("successfully connected")
}).catch((e)=>{
    console.log("err")
});
//mongoose.connect('mongodb://localhost:27017/myapp')