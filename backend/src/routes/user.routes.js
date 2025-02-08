import { Router } from "express";
import { registerUser, loginUser, getCurrentUser } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current-user", verifyUser, getCurrentUser);

export {router};
