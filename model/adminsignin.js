const mongoose = require("mongoose");

const signupadmin = new mongoose.Schema({
    name:{
        type: text,
        require: true
    },
    password:{
        type: text,
        require: true
    }
})

module.exports = mongoose.model("signupdata",signupadmin);