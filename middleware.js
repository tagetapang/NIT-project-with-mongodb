const express = require("express");
function protectroute(req,res,next){
    if(req.cookies.islogedin){
        next();
    }
    else{
        res.status(404).send("<h1>not allowed</h1>");
    }
}
module.exports = protectroute;