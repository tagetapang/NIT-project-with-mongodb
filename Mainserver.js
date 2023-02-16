const express = require('express');
const port = 3000;
const alert = require("alert");
const app = express();

const connecttoMongo = require('./Connectdatabase');
const salarypost = require('./model/administration');
const mongoose = require("mongoose");

connecttoMongo();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.set("view engine","hbs");

app.listen(port,() => {
    console.log(`app started in port http://localhost:${port}`)
});
app.get("/",(req,res)=>{
  res.send("go to either localhost3000/administration or localhost3000/showsalary");
})
app.get("/administration",(req,res)=>{
  res.render("adminsite");
});
app.get("/showsalary",(req,res)=>{
  res.render("showsalarysite");
})

// _____________________________________________administration______________________________________________________

app.post("/administration", async(req,res)=>{
    try {
        let user = await salarypost.findOne({ name: req.body.name });
        
        if (user) {
          alert("user already exist");
          return res.render("adminsite");
        }
        user = await salarypost.create({
            name: req.body.name,
            salary: req.body.salary,
            month: req.body.month,
        });
        alert("data successfully recorded");
        res.render("adminsite");
       
      } catch (error) {
        console.log(error.message);
      }

});

// ________________________________________________________________________________________________________________//
// __________________________________checksalary______________________________________________________________________________//

app.post("/showsalary",async(req,res)=>{
    try {
        let user = await salarypost.findOne({name: req.body.name,month: req.body.month});
        if(user){
           res.json({name: user.name , salary: user.salary,month: user.month});
        }
        else{
            alert("user doesn't exist");
            res.render("showsalarysite");
        }
        
    } catch (error) {
        
    }

})
// ________________________________________________________________________________________________________________