const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
        pet: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "pets",
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