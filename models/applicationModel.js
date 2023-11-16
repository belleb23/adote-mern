const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        userId: {
          type: String,
          required: false,
        },
        petId:{
          type: String,
          required: false,
        },
        userInfo: {
          type: Object,
          required: false,
        },
        petInfo: {
          type: Object,
          required: false,
        },
        age: {
          type: Number,
          required: false,
        },
        birth: {
          type: String,
          required: false,
        },
        cpf: {
          type: String,
          required: false,
        },
        address: {
          type: String,
          required: false,
        },
        cep: {
          type: String,
          required: false,
        },
        phone: {
          type: String,
          required: false,
        },
        work: {
          type: String,
          required: false,
        },
        havePet: {
          type: Boolean,
          required: false,
        },
        qtyPet: {
          type: Number,
          required: false,
        },
        vaciPet: {
          type: String,
          required: false,
        },
        castPet: {
          type: String,
          required: false,
        },
        condPet: {
          type: String,
          required: false,
        },
        residenceType: {
          type: String,
          required: false,
        },
        resiBill: {
          type: String,
          required: false,
        },
        resiAdult: {
          type: Number,
          required: false,
        },
        adultAgree: {
          type: String,
          required: false,
        },
        allergy: {
          type: String,
          required: false,
        },
        updatePet: {
          type: String,
          required: false,
        },
        move: {
          type: String,
          required: false,
        },
        agree: {
          type: String,
          required: false,
        },
        status: {
          type: String,
          default: "pending",
          enum: ["pending", "shortlisted", "rejected"],
        },
      },
      { timestamps: true }
);

const applicationModel = mongoose.model("applications", applicationSchema);
module.exports = applicationModel;