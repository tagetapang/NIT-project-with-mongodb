
const alert = require("alert");
function protectroute(req,res,next){
    if(req.cookies.islogedin){
        next();
    }
    else{
        alert("PLEASE LOGIN FIRST");
        res.redirect("/administration/signin");
    }
}
module.exports = protectroute;