const express = require('express')
const router = express.Router()

const all_teachers=require('../db/models/teacherSchema')
const Student_model=require('../db/models/authorSchema')
router.get('/', (req, res) => {
   //  res.render("authors/login")
   res.render("authors/login")

})



router.post('/', async(req, res) => {
    try{
      const userID=req.body.userID
      const password=req.body.password
      // console.log(`${userID} and password is ${password}`);
      const teacher= await all_teachers.findOne({userID:userID});//collection name.findOne({email:email})
      const date = new Date();
      //const dayIndex=date.getDay();
      const dayIndex=0;

      let day=""
     

      
      
      //const ismatched=bcrypt.compare(password==teacher.password)// console.log(userEmail);
      if(password==teacher.password){

          if(dayIndex==5||dayIndex==6){
          res.status(200).send("<h1>no class today</h1>")
          }else{
          if(dayIndex==0){
          day="sun"
          }else if(dayIndex==1){
          day="mon"
          }else if(dayIndex==2){
          day="tue"
          }else if(dayIndex==3){
          day="wed"
          }else if(dayIndex==4){
          day="thu"
          }
        
          let tacherClasses=[]
          teacher[day].forEach(element => {
          tacherClasses=element.split(",")
          });
         
       
        res.status(200).render("teachersClass.ejs",{tacherClasses:tacherClasses})
        
          }

        
      }else{
        res.status(400).send("invlid log in details")
      }
    }catch(error){
      res.status(500).send("catch block erorr")
    }
  })


  router.get('/:class_id', async(req, res) => {
    try {
      let classDetail=req.params.class_id.split("-")
      
  
      const dpt=classDetail[0].toUpperCase()
  
      const sem=classDetail[1]
     
      const shift=classDetail[2]
      
      const section=classDetail[3].toUpperCase()
    

    
    
  const mongoose= require("mongoose");
  const Student_model=require("../db/models/authorSchema")
  const student=await Student_model.find({"department":{"$eq":dpt},"shift":{"$eq":shift},"semister": {"$eq":sem},"section": {"$eq":section}});
 
  student.forEach(student=>{
    console.log(student.roll)
  })
  student.attBookID=req.params.class_id
    //{"department":{"$eq":"Et"},"shift":{"$eq":2},"semister": {"$eq":4},"section": {"$eq":"a"}}
    // console.log(student)
    const bookID={dpt:classDetail[0],sem:classDetail[1],shift:classDetail[2],section:classDetail[3],sub:classDetail[4]}
   
    
    res.render('attSheet.ejs',{student})//,{student}
    } catch (error) {
      res.send(`server erorr`)
    }
 //const studentDetails=db.getCollection('students').find({"department":{"$eq":"Et"},"shift":{"$eq":2},"semister": {"$eq":4},"section": {"$eq":"a"}})
  })






module.exports=router 
  
   