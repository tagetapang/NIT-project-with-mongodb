const mongoose = require('mongoose');

const salarypost = new mongoose.Schema({

    name:{
        type: String,
        require: true
    },
    salary:{
        type: Number,
        require: true
    },
    month:{
        type: Date,
        require: true
    }
})
module.exports = mongoose.model("salarypostdata",salarypost);