const mongoose = require("mongoose");
const volunterSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      required: true,
    },
    address: {
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
    timings : {
      type: Array,
      required: true,
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