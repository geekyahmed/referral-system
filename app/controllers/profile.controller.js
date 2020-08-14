const Referral = require('../models/referral').Referral

module.exports = {
  getProfile: async (req, res) => {
    await Referral.findOne({ userId: req.user._id })
      .populate('user')
      .then(loggedUser => {
        const generatedRefLink = `${req.protocol}://${req.headers.host}/register?reflink=${loggedUser.referralLink}`
        res.render('admin/index', {
          loggedUser: loggedUser,
          generatedRefLink: generatedRefLink
        })
      })
  }
}
