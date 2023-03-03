const mongoose = require("mongoose");

const signadmin = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model("signupdata",signadmin);