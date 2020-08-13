const bcrypt = require('bcryptjs')
const User = require('../models/user').User

module.exports = {
  /* LOGIN ROUTES */
  getLoginPage: (req, res) => {
    res.render('default/login', { message: req.flash('error') })
  },

  /* REGISTER ROUTES*/

  getRegisterPage: (req, res) => {
    res.render('default/register')
  },

  getUser: (req, res) => {
    let errors = []

    if (!req.body.fullname) {
      errors.push({ message: 'Fullname is mandatory' })
    }
    if (!req.body.email) {
      errors.push({ message: 'Email field is mandatory' })
    }
    if (!req.body.password || !req.body.passwordConfirm) {
      errors.push({ message: 'Password field is mandatory' })
    }
    if (req.body.password !== req.body.passwordConfirm) {
      errors.push({ message: 'Passwords do not match' })
    }

    if (errors.length > 0) {
      res.render('default/register', {
        errors: errors,
        fullname: req.body.fullname,
        email: req.body.email
      })
    } else {
      User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          req.flash('error-message', 'Email already exists, try to login.')
          res.redirect('/login')
        } else {
          const newUser = new User(req.body)

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              newUser.password = hash
              newUser.save().then(user => {
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
