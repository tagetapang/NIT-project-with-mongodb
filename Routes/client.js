const express = require("express");
const clientrouter = express.Router();
const salarypost = require("../model/administration");
const alert = require("alert");
const employee = require("../model/employes");

clientrouter.get("/salary", (req, res) => {
  res.render("./client/salarysite");
});

clientrouter.post("/salary", async (req, res) => {
  let user = await employee.findOne({name: req.body.name,password: req.body.password});
  if(user){
    if(req.body.month == ''){
      let userdata = await salarypost.find({name: req.body.name});
      if(userdata){
        res.render("./client/salaryresult",{user: userdata});
      }
      else{
        alert("no salary data exists for this user");
        res.render("./client/salarysite");
      }
    }
    else{
      let userdata = await salarypost.findOne({name: req.body.name,month: req.body.month});
      const arryuserdata = [userdata]
      if(userdata){
        res.render("./client/salaryresult",{user: arryuserdata});
      }
      else{
        alert("no salary data exists on this month");
        res.render("./client/salarysite");
      }
    }

  }
  else{
    alert("please enter correct credentials");
    res.render("./client/salarysite");
  }
 
});
// ________________________________________________________________________________________________________________
module.exports = clientrouter;

// if(user && req.body.month == null){
//   let userdata = await salarypost.find({name: req.body.name});
//   if(userdata){
//     res.render("./client/salaryresult", { user: userdata });
//   }
//   else{
//     alert("no salary data for this user");
//   }
// }

// try {
//   let user = await salarypost.findOne({
//     name: req.body.name,
//     month: req.body.month,
//   });
//   if (user) {
//     let temp = user.month;
//     let convertostring = temp.toString();
//     let spliting = convertostring.split(" ", 4);
//     const mymonth =
//       spliting[0] + " " + spliting[1] + " " + spliting[2] + " " + spliting[3];
//     const obj = {
//       name: user.name,
//       salary: user.salary,
//       month: mymonth,
//     };
//     res.render("./client/salaryresult", { user: obj });
//   } else {
//     alert("user doesn't exist");
//     res.render("./client/salarysite");
//   }
// } catch (error) {
//   console.log(error.message);
// }
