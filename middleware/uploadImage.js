const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file ,cb) =>{
        cb(null ,"uploads");
    },
    filename:(req ,file ,cb)=>{
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 100000);
        cb(null , uniqueName + path.extname(file.originalname))
    }
});

const upload = multer({storage})

const uploadProfileImage = upload.single("profileImage");

module.exports = uploadProfileImage;