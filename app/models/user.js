const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  referralId: {
    type: Schema.Types.ObjectId,
    ref: 'referral'
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = { User: mongoose.model('user', UserSchema) }
