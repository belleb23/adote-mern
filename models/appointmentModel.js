const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    volunterId: {
      type: String,
      required: true,
    },
    volunterInfo: {
      type: Object,
      required: true,
    },
    userInfo: {
      type: Object,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    appointmentType:{
      type: Array,
      required: true,
      default: [{ value: 'visita' }]
    },
    takePet:{
      type: String,
      required: true,
      default: "abrigo",
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);
module.exports = appointmentModel;