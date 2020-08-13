const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReferralSchema = new Schema({
  referralId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  referralLink: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = { Referral: mongoose.model('referral', ReferralSchema) }
