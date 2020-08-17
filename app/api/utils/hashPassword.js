const bcrypt = require("bcryptjs")

async function hashPassword(rawPassword) {
  try {
    const SALT = await bcrypt.genSalt(10)
    encryptedPassword = await bcrypt.hash(rawPassword, SALT)
    return encryptedPassword
  } catch (error) {
    throw error
  }
}

module.exports = hashPassword
