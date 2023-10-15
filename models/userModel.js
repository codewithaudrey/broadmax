const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const avatarType = {
  name: String,
  url: String,
};

const userSchema = new Schema(
  {
    role: { type: String, required: true },
    balance: { type: Number },
    avatar: avatarType,
    gender: { type: String, required: true },
    password: { type: String, required: true },
    inviteCode: { type: String, required: true },
    withdrawalPassword: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
