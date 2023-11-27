const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Volunter = require("../models/volunterModel");
const Appointment = require ("../models/appointmentModel");
const Pet = require ("../models/petModel");
const Application = require ("../models/applicationModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const moment = require("moment");
const dayjs = require("dayjs");
const { subHours, addHours, format } = require('date-fns');


router.post("/register", async (req, res) => {
        try {
            const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
        return res
            .status(200)
            .send({ message: "User already exists", success: false });
        }
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;
      const newuser = new User(req.body);

      await newuser.save();
      res
        .status(200)
        .send({ message: "User created successfully", success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Error creating user", success: false, error });
    }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ message: "Login successful", success: true, data: token });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error logging in", success: false, error });
  }
});

router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting user info", success: false, error });
  }
});
  
router.post("/apply-volunter-account", authMiddleware, async (req, res) => {
  try {
    const newvolunter = new Volunter({ ...req.body, status: "pending" });
    await newvolunter.save();

    const adminUser = await User.findOne({ isAdmin: true });

    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-volunter-request",
      message: `${newvolunter.userName} aplicou para ser voluntário`,
      data: {
        volunterId: newvolunter._id,
        name: newvolunter.userName,
      },
      onClickPath: "/admin/volunteerslist",
    });
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res.status(200).send({
      success: true,
      message: "Pedido de voluntário enviado com sucesso",
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

router.post("/mark-all-notifications-as-seen", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    const unseenNotifications = user.unseenNotifications;
    const seenNotifications = user.seenNotifications;
    seenNotifications.push(...unseenNotifications);
    user.unseenNotifications = [];
    user.seenNotifications = seenNotifications;
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notifications marked as seen",
      data: updatedUser,
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

router.post("/delete-all-notifications", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.seenNotifications = [];
    user.unseenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notifications cleared",
      data: updatedUser,
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

router.get("/get-all-approved-volunteers", authMiddleware, async (req, res) => {
  try {
    const volunteers = await Volunter.find({ status: "approved" });
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

router.get("/check-is-admin", authMiddleware, (req, res) => {
  try {
    // Verifique se o usuário tem a propriedade isAdmin definida como true
    if (req.user.isAdmin) {
      res.json({ isAdmin: true });
    } else {
      res.json({ isAdmin: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao verificar status de administrador", isAdmin: false });
  }
});

router.post('/pets', authMiddleware, async (req, res) => {
  try {
    const newpet = new Pet({ ...req.body});
    await newpet.save();

    res.status(201).json({
      success: true,
      message: 'Pet created successfully',
      data: newpet,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/pets", authMiddleware, async (req, res) => {
  try {
    const pets = await Pet.find({});
    res.status(200).send({
      message: "Pets fetched successfully",
      success: true,
      data: pets,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching pets",
      success: false,
      error,
    });
  }
});

router.post("/get-pet-info-by-id", authMiddleware, async (req, res) => {
  try {
    const pet = await Pet.findOne({ _id: req.body.petId });
    res.status(200).send({
      success: true,
      message: "Pet info fetched successfully",
      data: pet,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting pet info", success: false, error });
  }
});

router.post("/applications", authMiddleware, async (req, res) => {
  try {
    const newapplication = new Application({ ...req.body });
    await newapplication.save();
    const volunterUser = await User.findOne({isVolunter: true});

    const unseenNotifications = volunterUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-apllication-request",
      message: `${newapplication.userInfo.name} aplicou para adoção `,
      data: {
        volunterId: newapplication._id,
        name: newapplication.userInfo.name,
      },
      onClickPath: "/volunter/applications",
    });
    await User.findByIdAndUpdate(volunterUser._id, { unseenNotifications });
    res.status(201).json({
      message: 'Aplicattion created successfully',
      data: newapplication,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/check-application', authMiddleware, async (req, res) => {
  try {
    const { petId, userId } = req.query;

    // Verifique se existe uma aplicação com base no petId e userId
    const existingApplication = await Application.findOne({ petId, userId });

    if (existingApplication) {
      res.status(200).json({ applied: true });
    } else {
      res.status(200).json({ applied: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ applied: false, error: error.message });
  }
});

router.post('/user-adoptions', authMiddleware, async (req, res) => {
  try {
    // const userId = await User.findOne({ _id: req.body.userId });
    // const userAdoptions = await Application.find({ userId });

    console.log(req.body.userId)
    const user = await User.findOne({ _id: req.body.userId });
    const applications = await Application.find({ userId: user._id });
   
    res.status(200).json({ 
      message: "Applications fetched successfully",
      success: true, 
      data: applications, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/all-applications', async (req, res) => {
  try {
    
    const adoptions = await Application.find();

    res.status(200).json({
      success: true,
      data: adoptions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.post("/book-appointment", authMiddleware, async (req, res) => {
  try {
    req.body.status = "pending";

    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
   
    const user = await User.findOne({ _id: req.body.volunterInfo.userId });
    user.unseenNotifications.push({
      type: "new-appointment-request",
      message: `Uma nova visita foi agendado por ${req.body.userInfo.name}`,
      onClickPath: "/volunter/appointments",
    });
    await user.save();
    res.status(200).send({
      message: "Aguardar confirmação Voluntário",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Erro ao marcar visita",
      success: false,
      error,
    });
  }
});

router.post("/check-booking-avilability", authMiddleware, async (req, res) => {
  try {
  
    const date = req.body.date;
    const time = req.body.time;
    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute] = time.split(':').map(Number);

    let startHour = hour - 1;
    let startMinute = minute;

    if (startHour < 0) {
      startHour = 23;
      day -= 1;

      if (day < 1) {
        startHour = 0;
        day = 1;
        month -= 1;

        if (month < 1) {
          month = 12;
          year -= 1;
        }
      }
    }

    let endHour = hour + 1;
    let endMinute = minute;

    if (endHour > 23) {
    
      endHour = 0;
      day += 1;

      if (day > 31) {
      
        day = 1;
        month += 1;

        if (month > 12) {
          
          month = 1;
          year += 1;
        }
      }
    }

    // const formattedStartTime = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}`;
    // const formattedEndTime = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;
    
    const fromTime = `${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}`;
    const toTime = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;

    const volunterId = req.body.volunterId;
    const appointments = await Appointment.find({
      volunterId,
      date,
      time: { $gte: fromTime, $lte: toTime },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Visita indisponível",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Visita disponível",
        success: true,
        fromTime
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
});

router.get("/get-appointments-by-user-id", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.body.userId });
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
});

router.put("/update-user-profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      req.body
    );
      

    res.status(200).send({
      success: true,
      message: "Usuario editado com sucesso",
      data: user,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erro ao recuperar informacao do usuário", success: false, error });
  }
});

module.exports = router;