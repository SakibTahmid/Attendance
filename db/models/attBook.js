const mongoose= require("mongoose");
 
const attbook = new mongoose.Schema({
    attbook_id: {type:String},// ET-4-2-A-23142
    date:[String],//[[date list]
    roll_list:[String]//[[roll list]
    // //,[date,list],[date,list]] of present students
    
   
})
const att_Book_model=mongoose.model('attbook',attbook)
  module.exports=att_Book_model
