const mongoose=require('mongoose')
const bcrypt=require("bcryptjs")
//const jwt=require('jsonwebtoken')


//schema
const employeeSchema = new mongoose.Schema({
  first:{type: String,required:true}, // String is shorthand for {type: String}
  last:{type: String,required:true},
  email:{type: String,required:true},
  phone:{type: Number,required:true},
  password:{type: String,required:true},
  c_password:{type: String,required:true},
  tokens:[{
    token:{
      type: String,required:true
    }
  }]
  
});
// console.log(employeeSchema);

//genrate token
// employeeSchema.methods.genarateAuthToken = async function(){
// try{
// console.log(this._id)
// const token=jwt.sign({_id:this._id.toString()},"youtube.com/watch?v=XeXGH5Y1YFo")
// //this refers to schema
// this.tokens=this.tokens.concat({token:token})
// await this.save()
// return token
// }catch(erorr){
// res.send(`${erorr}`)
// }
// }

//hashing 
employeeSchema.pre("save", async function(next){
  if(this.isModified("password")){
    console.log(this.password);
    //const passHash= await bcrypt.hash(password,10)
    this.password=await bcrypt.hash(this.password,10)
    console.log(this.password)
    this.c_password=undefined
    // this.c_password=await bcrypt.hash(this.password,10)

  }
 
  next()
})


// collection // this const is a class , there for its first lesttter should be capital
const Register =new mongoose.model("Register",employeeSchema)// name in double coute must be capital

module.exports= Register