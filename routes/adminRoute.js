const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Volunter = require("../models/volunterModel");
const Pet = require("../models/petModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/get-all-volunteers", authMiddleware, async (req, res) => {
  try {
    const volunteers = await Volunter.find({});
    res.status(200).send({
      message: "Volunteers fetched successfully",
      success: true,
      data: volunteers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying volunter account",
      success: false,
      error,
    });
  }
});

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying user account",
      success: false,
      error,
    });
  }
});

router.post( "/change-volunter-account-status", authMiddleware, async (req, res) => {
      try {
        const { volunterId, status } = req.body;
        const volunter = await Volunter.findByIdAndUpdate(volunterId, {
          status,
        });
  
        const user = await User.findOne({ _id: volunter.userId });
        const unseenNotifications = user.unseenNotifications;
        unseenNotifications.push({
          type: "new-volunter-request-changed",
          message: `Your volunter account has been ${status}`,
          onClickPath: "/notifications",
        });
        user.isVolunter = status === "approved" ? true : false;
        await user.save();
  
        res.status(200).send({
          message: "Volunter status updated successfully",
          success: true,
          data: volunter,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "Error applying volunter account",
          success: false,
          error,
        });
      }
    }
  );

  router.delete("/delete-user/:id", authMiddleware, async (req, res) => {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndRemove(userId);
  
      if (!deletedUser) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }
  
      res.status(200).json({
        message: "User deleted successfully",
        success: true,
        data: deletedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error deleting user",
        success: false,
        error: error.message,
      });
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
  

module.exports = router;