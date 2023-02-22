const express = require("express");
const clientrouter = express.Router();
const salarypost = require("../model/administration");
const alert = require("alert");

clientrouter.get("/salary", (req, res) => {
  res.render("./client/salarysite");
});

clientrouter.post("/salary", async (req, res) => {
  try {
    let user = await salarypost.findOne({
      name: req.body.name,
      month: req.body.month,
    });
    if (user) {
      let temp = user.month;
      let convertostring = temp.toString();
      let spliting = convertostring.split(" ", 4);
      const mymonth =
        spliting[0] + " " + spliting[1] + " " + spliting[2] + " " + spliting[3];
      const obj = {
        name: user.name,
        salary: user.salary,
        month: mymonth,
      };
      res.render("./client/salaryresult", { user: obj });
    } else {
      alert("user doesn't exist");
      res.render("./client/salarysite");
    }
  } catch (error) {
    console.log(error.message);
  }
});
// ________________________________________________________________________________________________________________
module.exports = clientrouter;