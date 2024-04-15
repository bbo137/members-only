const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  username: { type: String, required: true, maxLength: 100 },
  password_hash: { type: String, required: true, maxLength: 100 },

  isAdmin: { type: Boolean, required: true },
  isMember: { type: Boolean, required: true },
});

UserSchema.virtual('name').get(function () {
  let fullname = '';
  if (this.first_name && this.family_name) {
    fullname = `${this.first_name}, ${this.family_name}`;
  }
  return fullname;
});

UserSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);
