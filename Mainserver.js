const express = require('express');
const port = 3000;
const app = express();
const connecttoMongo = require('./Connectdatabase');
const salarypost = require('./model/administration');
const mongoose = require("mongoose");

connecttoMongo();
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.set("view engine","hbs");

app.listen(port,() => {
    console.log(`app started in port http://localhost:${port}`)
});
app.get("/",(req,res)=>{
  res.render("index");
})

app.get("/administration",(req,res)=>{
    res.send("ok started");
})

// _____________________________________________administration______________________________________________________

app.post("/administration", async(req,res)=>{
    const name = req.body.name;
    try {
        let user = await salarypost.findOne({ name: req.body.name });
        if (user) {
          return res.status(400).send("already exist");
        }
        user = await salarypost.create({
          name: req.body.name,
          salary: req.body.salary,
          month: req.body.month,
        });
  
        res.send("successfully recorded");
      } catch (error) {
        console.log(error.message);
      }

});

// ________________________________________________________________________________________________________________//
// __________________________________checksalary______________________________________________________________________________//

app.get("/checksalary",async(req,res)=>{
    const name = req.body.name;
    try {
        let user = await salarypost.findOne({name: req.body.name});
        if(user){
            res.json({name: user.name,salary: user.salary,month:user.month});
        }
        else{
            res.send("user not found");
        }
        
    } catch (error) {
        
    }

})
// ________________________________________________________________________________________________________________