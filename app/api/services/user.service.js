const User = require("../../models/user").User

const getUser = async (query) => {
  try {
    const user = await User.findOne(query).select("+password")
    if (!user) {
      throw Error("Invalid credentials")
    }
    return user
  } catch (err) {
    throw Error(err)
  }
}

module.exports = { getUser }
