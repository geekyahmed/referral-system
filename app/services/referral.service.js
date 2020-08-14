const Referral = require('../models/referral').Referral
const User = require('../models/user').User

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
  },
  addReferrees: async (query, newRefUser) => {
    try {
      const referrer = await User.findOne(query).then(referrerData => {
        referrerData.referrees.push(newRefUser)
      })
      if (!referrer) {
        console.log(referrer)
      }
    } catch (err) {
      console.log(err)
    }
  }
}
