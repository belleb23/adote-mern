
// volunter routes 

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
  
  router.get("/get-appointments-by-volunter-id", authMiddleware, async (req, res) => {
    try {
      const volunter = await Volunter.findOne({ userId: req.body.userId });
      const appointments = await Appointment.find({ volunterId: volunter._id });
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
  
  router.post("/change-appointment-status", authMiddleware, async (req, res) => {
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
  