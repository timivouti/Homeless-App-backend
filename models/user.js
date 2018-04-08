const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
  name: String,
  price: Number,
  date: Date,
  activated: {
    type: Boolean,
    default: false
  }
});

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  countads: {
    type: Number,
    default: 0
  },
  items: [ItemsSchema]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
