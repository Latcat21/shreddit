const mongoose = require('mongoose');


const activitySchema = new mongoose.Schema({
  type: {type: String, required: true},
  duration: {type: String},
  quantity: {type: Number},
  name: {type: String, required: true}
});

const Activity = mongoose.model('Activity', activitySchema)


module.exports = Activity;
