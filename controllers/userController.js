//require model user
const User = require("../models/User")
//require model note
const Note = require("../models/Note")

//controller profile
const getProfileController = async(req, res ,next)=>{
    try {
        // get id from token
     const userId = req.user;
        // check user  DB => user(username , email , user image)
      const user = await User.findById(userId).select("-password");
      if(!user){
        return res
        .status(404)
        .json({msg:"User Not Found Please Register First"});
      }
        // get count notes 
        const totalnotes = await Note.countDocuments({user:userId})
        
        // get count notes => completed
        const completedNotes = await Note.countDocuments({user:userId , isCompleted:true})
        // get count notes => pending
        const pendingNotes = await Note.countDocuments({user:userId , isCompleted:false})
        //response
      res.status(200).json({
        user:{
            username:  user.username,
            email:  user.email,
            profileImage:  user.profileImage,
        },
        status:{
            total: totalnotes,
            completed: completedNotes,
            pending: pendingNotes,
        }
      })

    } catch (error) {
   next(error);
    }
}
//export
module.exports = getProfileController;