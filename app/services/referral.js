const Referral = require('../models/referral').Referral

module.exports = {
  checkReferer: async (req, res) => {
    const referrerId = req.query.referrer
    const referrerLink = req.query.reflink
    const validReferral = await Referral.findOne({
      referralLink: referrerLink,
      referralId: referrerId
    })
    if (validReferral) {
      await Referral.findOne({
        referralId: referrerId,
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
