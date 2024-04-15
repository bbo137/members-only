const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, maxLength: 100 },
  message: { type: String, required: true, maxLength: 4000 },
  timestamp: { type: Date },
});

MessageSchema.virtual('date').get(function () {
  return DateTime.fromJSDate(this.timestamp).toFormat('hh:mm - dd/MM/yyyy'); // format 'DD-MM-YYYY'
});

MessageSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Message', MessageSchema);
