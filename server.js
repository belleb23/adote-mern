const express = require("express");
const app = express();
require('dotenv').config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const volunterRoute = require("./routes/volunterRoute");


app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/volunter", volunterRoute);

const port = process.env.PORT || 5001;


app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));