const express = require("express");
const router = express.Router();
const Volunter = require("../models/volunterModel");
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require ("../models/appointmentModel");
const User = require("../models/userModel");

router.get("/get-volunter-info-by-user-id/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const volunter = await Volunter.findOne({userId});

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

router.get("/get-volunter-info-by-id/:id", authMiddleware, async (req, res) => {
  try {
    const volunter = await Volunter.findOne({ _id: req.params.id });
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

router.put("/update-volunter-profile", authMiddleware, async (req, res) => {
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

router.get("/get-appointments-by-volunter-id/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId)
    const volunter = await Volunter.findOne({userId});
    console.log(volunter);
    const appointments = await Appointment.find({ volunterId: volunter._id });
    console.log(appointments)
    res.status(200).send({
      message: "Appointments fetched successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching appointments",
      success: false,
      error,
    });
  }
}
);

router.put("/change-appointment-status", authMiddleware, async (req, res) => {
try {
  const { appointmentId, status } = req.body;
  const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
    status,
  });

  const user = await User.findOne({ _id: appointment.userId });
  const unseenNotifications = user.unseenNotifications;
  unseenNotifications.push({
    type: "appointment-status-changed",
    message: `Your appointment status has been ${status}`,
    onClickPath: "/appointments",
  });

  await user.save();

  res.status(200).send({
    message: "Appointment status updated successfully",
    success: true
  });
} catch (error) {
  console.log(error);
  res.status(500).send({
    message: "Error changing appointment status",
    success: false,
    error,
  });
}
});


module.exports = router;