const User = require("../../models/user").User

const getUser = async (query) => {
  try {
    const user = await User.findOne(query).select("+password")
    if (!user || !user.isActive) {
      throw Error("User not found or not active")
    }
    console.log(user)
    return user
  } catch (err) {
    throw Error(err)
  }
}

module.exports = { getUser }
