const express = require("express");
const router = express.Router();
const Volunter = require("../models/volunterModel");
const authMiddleware = require("../middlewares/authMiddleware");


router.post("/get-volunter-info-by-user-id", authMiddleware, async (req, res) => {
  try {
    const volunter = await Volunter.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Volunter info fetched successfully",
      data: volunter,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting volunter info", success: false, error });
  }
});

router.post("/get-volunter-info-by-id", authMiddleware, async (req, res) => {
  try {
    const volunter = await Volunter.findOne({ _id: req.body.volunterId });
    res.status(200).send({
      success: true,
      message: "Volunter info fetched successfully",
      data: volunter,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting volunter info", success: false, error });
  }
});

router.post("/update-volunter-profile", authMiddleware, async (req, res) => {
  try {
    const volunter = await Volunter.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Volunter profile updated successfully",
      data: volunter,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting volunter info", success: false, error });
  }
});


module.exports = router;