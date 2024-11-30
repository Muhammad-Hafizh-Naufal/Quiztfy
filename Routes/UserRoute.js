import express from "express";
import { getUsers, addUser } from "../Controller/UserController.js";

const router = express.Router();

router.get("/score", (req, res) => {
  res.send("This is the score route");
});

router.get("/", getUsers); // Get all users
router.post("/", addUser); // Add a new user

export default router;
