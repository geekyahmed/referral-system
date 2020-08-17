const Joi = require("@hapi/joi")

const registerValidation = async (data) => {
  const schema = Joi.object({
    fullname: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })
  try {
    return schema.validateAsync(data)
  } catch (error) {
    throw error
  }
}

// Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })

  return schema.validate(data)
}

module.exports = { registerValidation, loginValidation }
