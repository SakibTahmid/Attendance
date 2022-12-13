const express = require('express')
const router = express.Router()



const att_book_Schema=require('../db/models/attBook')
const Student_model=require("../db/models/authorSchema")

router.post('/:attBook_id',async(req, res) => {
  const attBook_id=req.params.attBook_id
  
  const attBook= await att_book_Schema.findOne({"attbook_id":{"$eq":attBook_id}})//ind({"department":{"$eq":dpt}//undefiend or defined
  //await attBook_inDB.attbooks.findOne({"attbook_id":{"$eq":attBook_id}}
  const allRolls=[]// all the rolls in that class is in here [ '560174', '560176', '560177' ]
  const presentRollsObj=JSON.parse(JSON.stringify(req.body))//[ [Object: null prototype] { '560174': 'on', '560176': 'on' } ]
  const presentRollsList=[]//[]

      let classDetail=attBook_id.split("-")
      //[ 'et', '2', '2', 'b', '26711' ]
      const dpt=classDetail[0].toUpperCase()
      // console.log(classDetail[0])//dpt
      const sem=classDetail[1]
      // console.log(classDetail[1])//sem
      const shift=classDetail[2]
      // console.log(classDetail[2])//shift
      const section=classDetail[3].toUpperCase()
      // console.log(classDetail[3])//section

      const student=await Student_model.find({"department":{"$eq":dpt},"shift":{"$eq":shift},"semister": {"$eq":sem},"section": {"$eq":section}});
      student.forEach(student=>{
        allRolls.push(student.roll.toString())//
      })
      allRolls.forEach(roll=>{
        if(presentRollsObj.hasOwnProperty(roll)){
          presentRollsList.push(roll)
        }})
      
    //"shift":{"$eq":shift},"semister": {"$eq":sem},"section": {"$eq":section}}
    //console.log(attBook_inDB);
    //console.log(attBook_id);
    //console.log(classDetail)
    //console.log(presentRollsObj)
    //console.log(allRolls)
    //console.log(presentRollsList)
    let todayDate = new Date();
    let dd = String(todayDate.getDate()).padStart(2, '0');
    let mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = todayDate.getFullYear();
     today = mm + '/' + dd + '/' + yyyy;
    //today="12/12/2022"
    console.log([today,presentRollsList.toString()])


       //
          // const attBook_Schem=new  attBook_inDB({
          //   attbook_id:attBook_id,
          //   roll_list_date:[[today,presentRollsList]]

          // })


          try {
          console.log(attBook_id)
          console.log(attBook)
          console.log(today)
          console.log(presentRollsList)
          console.log(presentRollsList.toString())

           
            ////////////////////////////////////////
            const updateDoc=async(_id)=>{
              try {
                const upDoc=await att_book_Schema.updateOne({attbook_id:attBook_id},
                { $push: {date:today}})
                const upDoc2=await att_book_Schema.updateOne({attbook_id:attBook_id},
                { $push: { roll_list:presentRollsList.toString()}})
                //const upDoc2=await att_book_Schema.updateOne({attbook_id:"et-6-1-c-26762"},
                //{ $push: { roll_list:presentRollsList.toString() } })





                //{ $push: {roll_list: { $each: presentRollsList } } })
                //{ $push: {roll_list: { $each: [ 90, 92, 85 ] } } })

                //.updateMany({_id:5},{$set:{ skills:["Sales Tax"]}})
                  // {$set:{name:presentRollsList}}
                  // ,function(err, doc){
                  //     if(err){
                  //         console.log("Something wrong when updating data!");
                  //     }console.log(doc);}
                
                      
                  //{$push:{today:presentRollsList}}
                  console.log(upDoc2)
                  console.log(upDoc)

              } catch (error) {
                console.log("nope")
              }
            }
            
////////////////////////////////////////////////////////////////////////////////////
// const updateDoc=async(_id)=>{
//   try {
//     const upDoc=await att_book_Schema.findOneAndDelete({attbook_id:attBook_id},
//       {$push:{name:presentRollsList.toString()}},function(err, doc){
//           if(err){
//               console.log("Something wrong when updating data!");
//           }console.log(doc);}
        
          
//       )//{$push:{today:presentRollsList}}
//       console.log(upDoc)
//   } catch (error) {
//     console.log("nope")
//   }
// }





// .findOneAndUpdate({attbook_id:attBook_id}, {$set:{name:"Naomi"}},function(err, doc){
//   if(err){
//       console.log("Something wrong when updating data!");
//   }

//   console.log(doc);
// });
            updateDoc(attBook_id)
            res.send("saved in newly created Attendance book [try block]")

          } catch (error) {
            res.send("couldn't save in any  Attendance book [catch block]")
            console.log(attBook)
          }
        }
        
       
         
        
        



  )


  module.exports =router