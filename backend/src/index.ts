import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./config/db";
import auth from "./routes/auth";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
connection();
app.get("/api/health", (_, res) => {
  res.json({
    success: true,
    message: "Server Running"
  });
});
app.use("/api/auth", auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});