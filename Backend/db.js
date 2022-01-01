const mongoose= require('mongoose');
const mongoURI = 'mongodb://localhost:27017/inoteBook?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

const connectToMongo=()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connect to mongoDB successfully");
    })
}

module.exports=connectToMongo;