const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    message: {
      type: String,
    },
    sender: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Chat = mongoose.model('theChat', chatSchema);

module.exports = Chat;
