const mongoose = require("mongoose");
mongoose.set('strictQuery',false);
const connecttoMongo = async () =>{
    try{
        await mongoose.connect("mongodb://0.0.0.0:27017/NIT-project");
        console.log("connected to mongo");
    }catch(err){
        console.log("faild to connect to mongodb",err);
    }

};
module.exports = connecttoMongo;
