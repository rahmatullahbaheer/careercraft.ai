const mongoose = require("mongoose");
const { Schema } = mongoose;

const SaleSchema = new Schema(
  {
    fullname: {
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
    amount: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: true,
    },
    service: {
      type: [],
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.models.Sale || mongoose.model("Sale", SaleSchema);
