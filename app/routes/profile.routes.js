const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile.controller')
const { isUserAuthenticated } = require('../middlewares/auth')

router.all('*', isUserAuthenticated, (req, res, next) => {
  req.app.locals.layout = 'admin'

  next()
})

/* DEFAULT ADMIN INDEX ROUTE*/

router.route('/').get(profileController.getProfile)

/* VARIOUS ADMIN POST ENDPOINTS */

module.exports = router
