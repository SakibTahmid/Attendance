const express = require('express')
const router = express.Router()
const Student_model=require('../db/models/authorSchema')

//all author routes
router.get('/',async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const Student=await Student_model.find(searchOptions)
  res.render('authors/index',{Student:Student,
    searchOptions: req.query
  })

  } catch (error) {
    res.redirect('/')
  }  
  })


// this route displays the form 
router.get('/new', (req, res) => {
    res.render('authors/new',{Student:new Student_model()})//const Student_model in 3
  })
// this route creates  authors
router.post('/',async(req, res) => {
  const Student=new  Student_model({
    name:req.body.authorName,
    department:req.body.department,
    semister:req.body.semister,
    shift:req.body.shift,
    section:req.body.section,
    roll:req.body.roll
  })
  try {
      const newStudent= await Student.save()
      
      res.send(req.body.authorName)
  } catch (error) {
    res.render('authors/new',{
      author:Author,
      erorrMessage:"erorr occurred creating author"
  }// res.render('authors/attendanceSheet',{student,bookID})
)}
})

module.exports=router
