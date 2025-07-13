const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    sender: {
      type: String,
    },

    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      default: false,
      type: Boolean,
      // required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
