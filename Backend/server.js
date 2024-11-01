const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config(); 

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
