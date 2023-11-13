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
    petSize: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    ageNumber:{
      type: Number,
      required: true,
    },
    race: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    castration:{
      type: String,
      required:true 
    }, 
    vaccine:{
      type: String,
      required:true 
    },
    illness: {
      type: Boolean,
      required: true,
    },
    illnessType: {
      type: String,
      required: false,
    },
    fiv: {
      type: Boolean,
      required: false,
    },
    verm:{
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    petType:{
      type: String,
      required: true,
      enum:['cachorro', 'gato', 'outro'],
      default: 'cachorro'
    },
    profilePic: {
      type: String,
      required: false,
    },
    urlPic: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const petModel = mongoose.model("pets", petSchema);
module.exports = petModel;