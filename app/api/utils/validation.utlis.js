const Joi = require("@hapi/joi")

const registerValidation = (data) => {
  const schema = Joi.object({
    fullname: Joi.string.min(6).required(),
    email: Joi.string.min(6).required().email,
    passwoed: Joi.string.min(6).required(),
  })
  return schema.validate(data)
}

// Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })

  return schema.validate(data)
}

module.exports = { registerValidation }
