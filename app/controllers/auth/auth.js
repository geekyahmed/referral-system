const bcrypt = require('bcryptjs')
const User = require('../../models/user').User
const Referral = require('../../models/referral').Referral
const ReferralService = require('../../services/referral')
const { v4: uuidv4 } = require('uuid')

module.exports = {
  /* LOGIN ROUTES */
  getLoginPage: (req, res) => {
    res.render('default/login', { message: req.flash('error') })
  },

  /* REGISTER ROUTES*/

  getRegisterPage: async (req, res) => {
    await ReferralService.checkReferer()
    res.render('default/register')
  },

  registerUser: async (req, res, next) => {
    let errors = []

    if (!req.body.fullname) {
      errors.push({ message: 'Fullname is mandatory' })
    }
    if (!req.body.email) {
      errors.push({ message: 'Email field is mandatory' })
    }
    if (!req.body.password) {
      errors.push({ message: 'Password field is mandatory' })
    }

    if (errors.length > 0) {
      res.render('default/register', {
        errors: errors,
        fullname: req.body.fullname,
        email: req.body.email
      })
    } else {
      await User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          req.flash('error-message', 'Email already exists, try to login.')
          res.redirect('/login')
        } else {
          const { fullname, email, password } = req.body
          const newUser = new User({
            fullname: fullname,
            email: email,
            password: password
          })
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              newUser.password = hash
              newUser.save().then(user => {
                const newReferrer = new Referral({
                  referralId: uuidv4(),
                  referralLink: uuidv4(),
                  userId: user._id
                })
                newReferrer.save()
                req.flash('success-message', 'You are now registered')
                res.redirect('/login')
              })
            })
          })
        }
      })
    }
  }
}
