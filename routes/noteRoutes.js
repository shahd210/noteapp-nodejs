const express =require("express")

const router = express.Router();
const authMiddleware =require("../middleware/authMiddleware")
const {postNoteController} = require("../controllers/noteController")


router.post ("/note" , authMiddleware , postNoteController)

module.exports= router