const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const { registerSchema, loginSchema } = require("./validation/authValidation")

const register = async (req, res) => {
    try {
        const { error, value } = registerSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })

        if (error) {
            return res.status(400).json({
                msg: error.details.map((err) => err.message)
            })
        }

        const { username, email, password } = value

        const existUser = await User.findOne({ email })
        if (existUser) return res.status(400).json({ msg: "User Already Exist" })

        const hashPassword = await bcrypt.hash(password, 10)

    const newUser =    await User.create({
            username,
            email,
            password: hashPassword,
            profileImage: req.file.path,
        })

        res.status(201).json({ msg: "Done Create Account" })

    } catch (error) {
        res.status(500).json({ msg: "server Error" })
    }
}

const login = async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })

        if (error) {
            return res.status(400).json({
                msg: error.details.map((err) => err.message)
            })
        }

        const { email, password } = value

        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ msg: "please create account first" })

        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) return res.status(400).json({ msg: "Invalid Password" })

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SK,
            { expiresIn: "1d" }
        )

        res.status(200).json({
            msg: "LOGIN SUCCESS",
            token,
        })

    } catch (error) {
        res.status(500).json({ msg: "server Error" })
    }
}

const logout = async (req, res) => {
    try {
        res.status(200).json({ msg: "logout success" })
    } catch (error) {
        res.status(500).json({ msg: "server error" })
    }
}

module.exports = { register, login, logout }