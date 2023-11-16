const mongoose = require("mongoose");
const volunterSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    birth: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    socialMedia: {
      type: String,
      required: true,
    },
    work: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    situation:{
      type: String,
      required: true,
    },
    group:{
      type: String,
      required: true,
    },
    timings : {
      type: Array,
      required: true,
    },
    activities:{
      type: Array,
      required: false,
    },
    status: {
      type: String,
      default: "pending",
    }
  },
  {
    timestamps: true,
  }
);

const volunterModel = mongoose.model("volunteers", volunterSchema);
module.exports = volunterModel;