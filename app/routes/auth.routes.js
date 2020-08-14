const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth/auth.controller')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user').User

router.all('/*', (req, res, next) => {
  req.app.locals.layout = 'default'

  next()
})

// Defining Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({ email: email }).then(user => {
        if (!user) {
          return done(
            null,
            false,
            req.flash('error-message', 'User not found with this email.')
          )
        }

        bcrypt.compare(password, user.password, (err, passwordMatched) => {
          if (err) {
            return err
          }

          if (!passwordMatched) {
            return done(
              null,
              false,
              req.flash('error-message', 'Invalid Username or Password')
            )
          }

          return done(
            null,
            user,
            req.flash('success-message', 'Login Successful')
          )
        })
      })
    }
  )
)

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

// noinspection JSCheckFunctionSignatures
router
  .route('/login')
  .get(authController.getLoginPage)
  .post(
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true,
      successFlash: true,
      session: true
    })
  )

// noinspection JSCheckFunctionSignatures
router
  .route('/register')
  .get(authController.getRegisterPage)
  .post(authController.registerUser)

router.get('/logout', (req, res) => {
  req.logOut()
  req.flash('success-message', 'Logout was successful')
  res.redirect('/login')
})

module.exports = router
