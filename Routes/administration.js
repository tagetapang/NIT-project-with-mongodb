const express = require("express");
const authrouter = express.Router();
const signadmin = require("../model/adminsignin");
const salarypost = require("../model/administration");
const alert = require("alert");
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

authrouter.get("/salaryallot",protectroute,(req, res) => {
  res.render("./admin/adminsite");
});

authrouter.post("/salaryallot",protectroute, async (req, res) => {
  try {
    let user = await salarypost.findOne({ name: req.body.name });

    if (user) {
      alert("user already exist");
      return res.render("./admin/adminsite");
    }
    user = await salarypost.create({
      name: req.body.name,
      salary: req.body.salary,
      month: req.body.month,
    });
    alert("data successfully recorded");
    res.render("./admin/adminsite");
  } catch (error) {
    console.log(error.message);
  }
});
// ___________________________________________________________log out__________________________________________________
authrouter.get("/logout",(req,res)=>{
  res.cookie('islogedin','',{maxAge:1});
  res.redirect("/administration/signin")
})

module.exports = authrouter;