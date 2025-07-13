const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: false,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);
