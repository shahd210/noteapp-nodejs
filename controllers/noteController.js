const User =require("../models/User")
const Note =require("../models/Note")
const {noteSchema} =require("./validation/noteValidation")

const postNoteController = async (req ,res ,next)=>{

try {
 //Joi =>  get data from front & validation 
const {error , value } = noteSchema.validate(req.body ,{
    abortEarly:false ,
    stripUnknown:true,
})
if(error){
    return res.status(400).json({
        msg: error.details.map((err) => err.message)
    })
}
//value =req.body
const content = value.content
//get ID from token
const userID = req.user;
//create new note to insert DB
const newNote =await Note.create({
    content,
    user:userID,  
})
//response
res.status(201).json({
    msg: "  Done Created New Note"
})

    
} catch (error) {
   next(error);
}

}

module.exports ={
    postNoteController
}
