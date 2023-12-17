const express = require("express");
const router = express.Router();
const Volunter = require("../models/volunterModel");
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require ("../models/appointmentModel");
const User = require("../models/userModel");
const Pet = require("../models/petModel")
const Application = require ("../models/applicationModel");
const adminMiddleware = require("../middlewares/adminMiddleware");

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dv7fyoaof',
  api_key: '826388641662275',
  api_secret: '7KyUmaHmrLyq2hTssQtDRGMhj1k'
});


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

    const { userId, name, email, ...volunterFields } = req.body;
    await User.findOneAndUpdate(
      { _id: userId },
      { name, email }
    );

    const updatedVolunter = await Volunter.findOneAndUpdate(
      { userId },
      volunterFields,
      { new: true } 
    );

    res.status(200).send({
      success: true,
      message: "Volunter profile updated successfully",
      data: updatedVolunter,
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
    const volunter = await Volunter.findOne({userId});
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
    message: `Sua visita foi ${status}`,
    onClickPath: "/list-appointments",
  });

  await user.save();

  res.status(200).send({
    message: "Visita status alterada com sucesso",
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

router.put('/change-application-status', authMiddleware, async (req, res) => {
  try {
    const { applicationId, status } = req.body;
   
    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true } 
    );

    if (status === 'approved'){
      const status = 'adotado'
      const petId = application.petInfo._id;
      const owner = application.userInfo.name;

      const user = await User.findOne({ _id : application.userId});
      const unseenNotifications = user.unseenNotifications;

      unseenNotifications.push({
        type:"application-approved",
        message: `A sua solicitação de adoção para o pet ${application.petInfo.name} foi aprovada`,
        onClickPath: "/user-adoptions",
      })

      await User.findByIdAndUpdate(user._id, { unseenNotifications });
      
      const pet = await Pet.findByIdAndUpdate(
        petId,
        { status, owner },
        { new: true } 
      )

    }

    res.status(200).send({
      message: 'Status da aplicação atualizado com sucesso',
      success: true,
      data: application,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Erro ao atualizar o status da aplicação',
      success: false,
      error,
    });
  }
});

router.put("/update-pet", authMiddleware, async (req, res) => {
  try {
    if (req.body.image) {
      const uploadedImage = await cloudinary.uploader.upload(req.body.image, {
        folder: 'pets',
        eager: { width: 300, height: 300, crop: 'pad' }
      });

      req.body.urlPic = uploadedImage.secure_url; 
    }

    const pet = await Pet.findOneAndUpdate(
      { _id: req.body.petId },
      req.body, {new: true}
    );

    const application = await Application.findOneAndUpdate(
      { petId: req.body.petId },  
      { petInfo: req.body } ,
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Pet updated successfully",
      data: pet,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting pet info", success: false, error });
  }
});

router.delete("/delete-pet/:id", authMiddleware, async (req, res) => {
  try {
    const petId = req.params.id;
    const deletedPet = await Pet.findByIdAndRemove(petId);

    if (!deletedPet) {
      return res.status(404).json({
        message: "Pet not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Pet deleted successfully",
      success: true,
      data: deletedPet,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error deleting pet",
      success: false,
      error: error.message,
    });
  }
});

router.get("/get-user-and-volunter-info/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const volunter = await Volunter.findOne({userId});

    const user = await User.findOne({_id: userId}, 'name email isVolunter');

    const combinedInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isVolunter: user.isVolunter,
      ...(volunter && {  
            phoneNumber: volunter.phoneNumber,
            birth: volunter.birth,
            address: volunter.address,
            socialMedia: volunter.socialMedia,
            work: volunter.work,
            reason: volunter.reason,
            situation: volunter.situation,
            group: volunter.group,
            timings: volunter.timings,
            activities: volunter.activities,
            status: volunter.status,
      }),
    };

    console.log(combinedInfo)

    res.status(200).send({
      success: true,
      message: "Volunter info fetched successfully",
      data: combinedInfo,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting volunter info", success: false, error });
  }
});

module.exports = router;