const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const todoListRoutes = require("./routes/todoListRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5500;

app.use(cors());
app.use("/", todoListRoutes);

app.listen(PORT, () => console.log("SERVER CONNECTED SUCCESSFULLY"));
