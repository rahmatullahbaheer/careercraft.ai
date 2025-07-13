const mongoose = require("mongoose");
const { Schema } = mongoose;

const CouponSchema = new Schema(
  {
    coupon_type: {
      type: String,
      required: true,
      enum: ["reward", "stripe", "paypal", "services"],
    },

    coupon_code: {
      type: String,
      required: true,
      unique: true,
    },

    plan:{
      type:String,
      default:"all"
    },

    amount_off: {
      type: Number,
      min: 0,
    },
    currency: String,
    duration: {
      type: String,
      enum: ["once", "repeating", "forever"],
    },
    duration_in_months: {
      type: Number,
    },
    livemode: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    percent_off: {
      type: Number,
      min: 0,
      max: 100,
    },
    credits: {
      type: Number,
      min: 1,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
    },
    valid: {
      type: Boolean,
      default: true,
    },
    times_redeemed: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);
