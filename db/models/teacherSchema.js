const mongoose= require("mongoose");
 
const teacherSchema = new mongoose.Schema({
    name:{type: String,required:true},
    userID:{type: String,required:true},
    password:{type:String,required:true},
    sun:[String],
    mon:[String],
    tue:[String],
    wed:[String],
    thu:[String],
    fri:[String],
    sat:[String]


   

    
  });
  module.exports=mongoose.model('All_teachers',teacherSchema)

  