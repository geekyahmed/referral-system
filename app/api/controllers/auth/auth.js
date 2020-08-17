const User = require("../../../models/user")
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

const handleValidation = (body, res, type) => {
  const { error } = validation[type](body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  // eslint-disable-next-line consistent-return
  return
}

const registerUser = async (req, res) => {
  try {
    handleValidation(req.body, res, "register")
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) {
      return res.status(400).json({ error: "Email already exists" })
    }
    req.body.password = await hashPassword(req.body.password)
    const user = new User(req.body)
    const savedUser = await user.save()
    return res.status(201).json({ message: "success", data: savedUser })
  } catch (error) {
    return res.status(400).json({ error: err })
  }
}
const loginUser = async (req, res) => {
  try {
    handleValidation(req.body, res, "login")
    const user = await getUser({ email: req.body.email })
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" })
    }

    const token = jwt.sign({ _id: user._id, SECRET })
    return res.status(200).json({ access_token: token })
  } catch (error) {
    return res.status(400).json({ error_msg: err.message })
  }
}

module.exports = { registerUser, loginUser }
