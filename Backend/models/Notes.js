const mongoose= require('mongoose');


const notesSchema = new Schema({
    title :{
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    tag : {
        type : String,
        dafault : general
    },
    date : {
        type : Date,
        default : Date.now
    }
  });

  module.exports=mongoose.model('user', notesSchema);