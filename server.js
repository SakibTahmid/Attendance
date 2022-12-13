
const express = require('express')
const expressLayouts=require('express-ejs-layouts')
const body_parser=require('body-parser')
require('dotenv').config()// use .env variable
const app = express()
const port = 7000;
//const jwt=require('jsonwebtoken')


require('./db/db_connection.js')
// view engine






const indexRoute=require('./routes/index')
const studentsRoute=require('./routes/students')
const addManyStudents=require('./routes/Addmanystu')
const addTeachers=require('./routes/addTeachers')
const saveStuDataDb=require('./routes/saveStuDataDb')
const saveTeacherToDB=require('./routes/saveTeacherToDB')
const login=require('./routes/login')
const addAttbook=require('./routes/addAttbook')
const AttendanceSheet=require('./routes/AttendanceSheet')








app.use(express.urlencoded({extended:false}))


app.set("view engine","ejs")//setting up view engine
app.set("views",__dirname+"/views")//setting up views folder
app.set("layout","layouts/layout")//setting up layout folder

app.use(expressLayouts)
app.use(express.static('public'))
app.use(body_parser.urlencoded({limit:'10mb',extended:false}))
//app.use(express.json()) thapa use করেছিলো form থেকে ডাটা লোড দিতে app.use(express.urlencoded({extended:false}))

app.use("/",indexRoute)
app.use("/students",studentsRoute)// every route in author.js will be like this author/etc.
app.use("/addManyStudents",addManyStudents)
app.use("/addTeachers",addTeachers)
app.use("/saveStuDataDb",saveStuDataDb)
app.use("/saveTeacherToDB",saveTeacherToDB)
app.use("/login",login)
app.use("/addAttbook",addAttbook)
app.use("/attbook",AttendanceSheet)


// app.get('/login/:id', (req, res) => {
//   res.send(req.params)
// })attendaceBook








app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening on port ${process.env.PORT||port}`)
})
console.log(process.env.DATABASE_URL);
