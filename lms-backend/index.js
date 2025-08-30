import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { register, login } from "./controllers/authController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
//test repo


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post("/api/auth/register", register);
app.post("/api/auth/login", login);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
