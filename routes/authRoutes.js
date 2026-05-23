const express =require("express")
const router = express.Router();

const {register , login , logout} =require("../controllers/authController")
const uploadProfileImage =require("../middleware/uploadImage")

router.post("/register", uploadProfileImage , register);
router.post("/login" , login);
router.post("/logout" ,logout)

module.exports = router;