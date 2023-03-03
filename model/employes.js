const mongoose = require('mongoose');

const employee = new mongoose.Schema({

    name:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
})
module.exports = mongoose.model("employee",employee);

//sorry