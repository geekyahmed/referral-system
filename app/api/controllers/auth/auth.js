const { User } = require("../../../models/user")
const hashPassword = require("../../utils/hashPassword")
const {
  registerValidation,
  loginValidation,
} = require("../../utils/validation.utlis")
const { getUser } = require("../../services/user.service")
const bcrypt = require("bcryptjs")
const { SECRET } = require("../../../../config/config")
const jwt = require("jsonwebtoken")

const validation = {
  register: registerValidation,
  login: loginValidation,
}

const handleValidation = async (body, type) => {
  try {
    await validation[type](body)
  } catch (error) {
    throw error
  }
}

const registerUser = async (req, res) => {
  try {
    await handleValidation(req.body, "register")
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) {
      return res.status(400).json({ error: "Email already exists" })
    }
    req.body.password = await hashPassword(req.body.password)
    const user = new User(req.body)
    const savedUser = await user.save()
    return res.status(201).json({ message: "success", data: savedUser })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}
const loginUser = async (req, res) => {
  try {
    handleValidation(req.body, "login")
    const user = await getUser({ email: req.body.email })
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" })
    }
    const token = jwt.sign({ _id: user._id }, SECRET)
    return res.status(200).json({ access_token: token })
  } catch (err) {
    return res.status(400).json({ error_msg: err.message })
  }
}

module.exports = { registerUser, loginUser }
