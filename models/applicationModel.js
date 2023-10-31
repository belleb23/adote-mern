const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        userId: {
          type: String,
          required: true,
        },
        petId:{
          type: String,
          required: true,
        },
        nome:{
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "shortlisted", "rejected"],
        },
      },
      { timestamps: true }
);

const applicationModel = mongoose.model("applications", applicationSchema);
module.exports = applicationModel;