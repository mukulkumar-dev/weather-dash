const express = require("express");
const cors = require("cors");
require("dotenv").config();

const weatherRoutes = require("./routes/weather");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/weather", weatherRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
