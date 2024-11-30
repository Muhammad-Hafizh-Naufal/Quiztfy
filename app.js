import express from "express";
import cors from "cors";
import UserRoute from "./Routes/UserRoute.js";
import db from "./Database/database.js";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/users", UserRoute);

// Sync database
db.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database connection failed: ", err));

// server running
app.listen(3000, () => {
  console.log(`Server running on http://localhost:${3000}`);
});
