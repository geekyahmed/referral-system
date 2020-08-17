const Referral = require("../models/referral").Referral
const User = require("../models/user").User

module.exports = {
  //Check if referral is valid and gets the referrer ID
  checkReferer: async (query) => {
    try {
      const referral = await Referral.findOne(query).populate({
        path: "userId",
      })
      //If referral is not found, throw error.
      if (!referral) {
        throw new Error("Invalid Referral")
      }
      return referral
    } catch (err) {
      throw new Error(err)

      console.log(err)
    }
  },
}
