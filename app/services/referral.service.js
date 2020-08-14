const Referral = require('../models/referral').Referral

module.exports = {
  checkReferer: async query => {
    try {
      const referral = await Referral.findOne(query).populate({
        path: 'userId'
      })
      if (!referral) {
        throw new Error('Invalid Referral')
      }
      return referral
    } catch (err) {
      console.log(err)
    }
  }
}
