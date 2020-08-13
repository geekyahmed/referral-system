const Referral = require('../models/referral').Referral
const Referral = require('../models/referral').Referral
const { v4: uuidv4 } = require('uuid')

module.exports = {
  generateReferralLink: async (req, res, next) => {
    if (req.user) {
      await Referral.findOne({ userId: req.user._id }).then(userReferral => {
        const userReferralLink = new Schema({
          referralLink: uuidv4()
        })
        userReferralLink.save().then(savedReferralLink => {
          
        })
      })
    }
  }
}
