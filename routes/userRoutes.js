const express = require("express")
const router = express.Router();

const getProfileController =require("../controllers/userController")
const authMiddleware = require("../middleware/authMiddleware")

router.get("/profile" , authMiddleware ,getProfileController)

module.exports = router;