const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
   
  },
  {
    timestamps: true,
  }
);

const petModel = mongoose.model("pets", petSchema);
module.exports = petModel;