const express = require("express");
const authrouter = express.Router();
const signadmin = require("../model/adminsignin");
const salarypost = require("../model/administration");
const alert = require("alert");

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
      res.redirect("/administration/salaryallot");
    }
  } catch (error) {
    res.send(error.message);
  }
});

authrouter.get("/salaryallot", (req, res) => {
  res.render("./admin/adminsite");
});

authrouter.post("/salaryallot", async (req, res) => {
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

module.exports = authrouter;