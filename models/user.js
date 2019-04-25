const mongoose = require('mongoose');
const Plan = require('./plan')

const userSchema = new mongoose.Schema({
  name:{
      type: String,
      required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  weights:{
    type: Boolean
  },
  ployos:{
    type: Boolean
  },
  cardio: Boolean//,
  // plans: [{
  //   ref plan
  //   'Plan'
  // }]
}

const User = mongoose.model('User', userSchema)
module.exports = User

