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
  res.render("home");
})
app.get("/administration",(req,res)=>{
  res.render("adminsite");
});
app.get("/salary",(req,res)=>{
  res.render("salarysite");
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

app.post("/salary",async(req,res)=>{
    try {
        let user = await salarypost.findOne({name: req.body.name,month: req.body.month});
        if(user){
          let temp = user.month;
          let convertostring = temp.toString();
          let spliting = convertostring.split(" ",4);
          const mymonth = spliting[0] +" "+ spliting[1] +" "+ spliting[2] +" "+ spliting[3];
          const obj = {
            name: user.name,
            salary: user.salary,
            month: mymonth
          }
           res.render("salaryresult",{user: obj});
        }
        else{
            alert("user doesn't exist");
            res.render("salarysite");
        }
        
    } catch (error) {
      console.log(error.message);
        
    }

})
// ________________________________________________________________________________________________________________