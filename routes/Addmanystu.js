const express = require('express')
const multer = require('multer')
const dest='./uploads/'
const router = express.Router()
const path=require('path')

const csvFilePath='./uploads/students.csv'
//const csvFilePath=require('')

const authorSchema=require('../db/models/authorSchema')
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
    res.render("authors/Addmanystu")
  })

  // router.get('/saveStuDataDb',(req,res)=>{/// addManyStudents/saveStuDataDb
  //       res.render("authors/csvtojson")
  //   })

router.post('/', multerApp.single("students_file"),(req, res) => {

  res.send("success");// window.location.href = "/page_location"; 
  })

  router.post("/saveStuDataDb",async(req,res)=>{

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
