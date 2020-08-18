const { User } = require("../../../models/user")
const { Referral } = require("../../../models/referral")
const hashPassword = require("../../utils/hashPassword")
const generateResponse = require("../../utils/utils")
const {
  registerValidation,
  loginValidation,
} = require("../../utils/validation.utlis")
const { getUser } = require("../../services/user.service")
const bcrypt = require("bcryptjs")
const { SECRET } = require("../../../../config/config")
const jwt = require("jsonwebtoken")
const referralService = require("../../../services/referral.service")
const { v4: uuidv4 } = require("uuid")

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
      return generateResponse(res, 400, "Email Already Exists")
    }

    req.body.password = await hashPassword(req.body.password)
    const user = new User(req.body)

    //Checks if register link contains query "reflink"
    if (req.query.reflink) {
      //Validate referral link and gets the referrer
      const referral = await referralService.checkReferer({
        referralId: req.query.reflink,
      })
      // Saves the refId as the person that reffered
      user.refId = referral
    }

    const savedUser = await user.save()
    //Creates new referral for new user
    const newReferrer = new Referral({
      referralId: uuidv4(),
      referralLink: uuidv4(),
      userId: user._id,
    })
    //save referral to the database and redirect to login
    await newReferrer.save()

    const customUserResponse = { user: savedUser }
    customUserResponse.refCode = newReferrer.referralId

    return res
      .status(201)
      .json({ message: "success", data: customUserResponse })
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
    return generateResponse(res, 200, err.message)
  }
}

module.exports = { registerUser, loginUser }
