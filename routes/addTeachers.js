const express = require('express')
const multer = require('multer')
const dest='./uploads/'
const router = express.Router()
const path=require('path')
const csvFilePath='./uploads/teacher.csv'
const authorSchema=require('../db/models/teacherSchema')
const csvtojson=require('csvtojson')


const storage=multer.diskStorage({
   destination:(req,file,cb)=>{
    cb(null,dest)
   },
  filename:(req,file,cb)=>{
    const fileExtention=path.extname(file.originalname);
    const fileName=file.originalname.replace(fileExtention,"").toLocaleLowerCase().split(" ").join("-")
    cb(null,fileName+fileExtention)
   
  }
})

const multerApp=multer({
  storage:storage,
  limits:{
    fileSize:2000000
  },
  fileFilter:(req,file,cb)=>{
    if(file.mimetype==="text/csv"){
      cb(null,true)
    }else{
      cb(null,false)

    }

  }
})



router.get('/',(req, res) => {
    res.render("authors/addTeachers")
  })

router.post('/', multerApp.single("teachers_file"),(req, res) => {
    res.send('file uploaded')
  })
  router.post("/saveTeacherToDB",async(req,res)=>{
  
        csvtojson()
        .fromFile(csvFilePath)
        .then((jsonObj)=>{
            console.log(jsonObj);
            authorSchema.insertMany(jsonObj).then(()=>{
                console.log("Data successfully inserted")
                res.send("Data successfully  inserted")
            }).catch(()=>{
                res.send("Data was not inserted")
            })
            
           
        })
    })
module.exports=router


