import express from "express";
import { logout, signin, signup } from "../controllers/authController.js";
const router = express.Router();
router.post("/signup", signup)
router.post("/signin", signin)
router.get("/signout", logout)
export default router;