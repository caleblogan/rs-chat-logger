const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const botSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  client_id: { type: String, required: true, unique: true },
  mac_addr: String,
  ip_addr: String,
  world: Number,
  description: String,
  location_name: String,
  last_checkin: Date,
});

botSchema.pre('save', function(next) {
  const now = new Date();
  if (!this.last_checkin) {
    this.last_checkin = now;
  }
  next();
});


const Bot = mongoose.model('Bot', botSchema);

module.exports = Bot;