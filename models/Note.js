//call mongoose
const { default: mongoose } = require("mongoose");
const mogoose = require("mongoose")
//create schema
const noteSchema = new mongoose.Schema({
 content:{
    type:String ,
   required: true,
 },
 isCompleted:{
     type:Boolean ,
    default:false,
 },
 user:{
     type:mongoose.Schema.Types.ObjectId ,
    ref:"User" ,
    required: true,
 }
}
    ,{timestamps:true})
//create model
const Note = mongoose.model("Note", noteSchema)

//export module
module.exports = Note;