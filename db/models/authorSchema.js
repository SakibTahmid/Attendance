const mongoose= require("mongoose");
 
const StudentSchema = new mongoose.Schema({
    name:{type: String,required:true},
    department:{type: String,required:true},
    semister:{type: Number,required:true},
    shift:{type: Number,required:true},
    section:{type: String,required:true},
    roll:{type: Number,required:true}
  });
  module.exports=mongoose.model('Student',StudentSchema)

  // name:{type: String,required:true},
  // dateList:[String],["1/01/22","2/01/22",......
  // rollList:[String],[[1,2,3,4..],[1,2,3,4..],...]