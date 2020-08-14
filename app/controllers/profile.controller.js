const Referral = require('../models/referral').Referral

module.exports = {
  getProfile: async (req, res) => {
    await Referral.findOne({ userId: req.user._id })
      .populate('user')
      .then(loggedUser => {
        res.render('admin/index', { loggedUser: loggedUser })
      })
  }
}
