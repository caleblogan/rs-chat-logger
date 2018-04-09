const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  bot: { type: Schema.Types.ObjectId, required: true, ref: 'Bot' },
  username: { type: String, required: true },
  message: { type: String, required: true },
  type: String,
  tile: String, // x y z
  locationName: String,
  world: Number,
  created_at: Date,
});

messageSchema.pre('save', function(next) {
  const now = new Date();
  if (!this.created_at) {
    this.created_at = now
  }
  next()
});


const Message = mongoose.model('Message', messageSchema);

module.exports = Message;