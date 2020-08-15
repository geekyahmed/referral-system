const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile.controller')
const { isUserAuthenticated } = require('../middlewares/auth')

router.all('*', isUserAuthenticated, (req, res, next) => {
  req.app.locals.layout = 'admin'

  next()
})

//Profile Route

router.route('/').get(profileController.getProfile)

module.exports = router
