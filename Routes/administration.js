const express = require("express");
const authrouter = express.Router();
const signadmin = require("../model/adminsignin");
const salarypost = require("../model/administration");
const alert = require("alert");
const employee = require("../model/employes");
const protectroute = require("../middleware");
const cookieParser = require("cookie-parser");
authrouter.use(cookieParser());

// _____________________________________________signin__________________________________________________________
authrouter.get("/signin", (req, res) => {
  res.render("./admin/adminsignin");
});
authrouter.post("/signin", async (req, res) => {
  try {
    const user = await signadmin.findOne({
      name: req.body.name,
      password: req.body.password,
    });
    if (!user) {
      alert("please enter correct credentials");
      res.render("./admin/adminsignin");
    } else {
      res.cookie('islogedin',true,{maxAge: 900000,httpOnly: true});
      res.redirect("/administration/salaryallot");
    }
  } catch (error) {
    res.send(error.message);
  }
});
// __________________________________________________alot salary________________________________________________

authrouter.get("/salaryallot",protectroute,async(req, res) => {
  let user = await employee.find();
  res.render("./admin/adminsite",{user:user});
});

authrouter.post("/salaryallot",protectroute, async (req, res) => {
  let user = await salarypost.findOne({name: req.body.name,month: req.body.month});
  if(user){
    await salarypost.findOneAndUpdate({name: req.body.name},{salary: req.body.salary});
    alert("sucessfully updated data");
    res.redirect("/administration/salaryallot");
  }
  else{
    objwithsalary = {name: req.body.name,salary: req.body.salary,month: req.body.month};
    salarypost.create(objwithsalary);
    alert("successfully created data");
    res.redirect("/administration/salaryallot");
  }
});
// __________________________________________________________create employee____________________________________
authrouter.post("/createemploy",async(req,res)=>{
  const {name,password,cpassword} = req.body;
  try {
    
    let user = await employee.findOne({name: req.body.name})
    if(user){
      alert("employee already exists");
      res.redirect("/administration/salaryallot");
    }
    else{
      if(password !== cpassword){
        alert("password doesn't match please refill")
        res.redirect("/administration/salaryallot");
      }
      else{
        employee.create({
          name: req.body.name,
          password: req.body.password
        })
        alert("employee account created successfully");
        res.redirect("/administration/salaryallot");
      }
  
    }
  } catch (error) {
    res.send("server error");
    
  }
})
// ___________________________________________________________log out__________________________________________________
authrouter.get("/logout",(req,res)=>{
  res.cookie('islogedin','',{maxAge:1});
  res.redirect("/administration/signin")
})

module.exports = authrouter;