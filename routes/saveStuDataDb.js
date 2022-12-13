const express = require('express')
const router = express.Router()


const csvFilePath='./uploads/students.csv'
//const csvFilePath=require('')

const authorSchema=require('../db/models/authorSchema')
const csvtojson=require('csvtojson')

router.get('/',(req,res)=>{
    res.render("authors/csvtojson")
})
router.post("/",async(req,res)=>{

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
