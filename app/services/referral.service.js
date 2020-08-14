const Referral = require('../models/referral').Referral

module.exports = {
  checkReferer: async (req, res) => {
    const referrerLink = req.query.reflink
    const validReferral = await Referral.findOne({
      referralLink: referrerLink
    })
    if (validReferral) {
      await Referral.findOne({
        referralLink: referrerLink
      })
        .populate('user')
        .then(referredUser => {
          return res.render('default/login', { referredUser: referredUser })
        })
    } else {
      res.json({ msg: 'Invalid Referral Link' })
    }
  }
}
