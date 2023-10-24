const express = require("express");
const app = express();

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));