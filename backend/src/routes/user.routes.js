import { Router } from "express";
import { registerUser, loginUser, getCurrentUser, getRegisteredEvents, registerUserToEvent, getUserEvents} from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current-user", verifyUser, getCurrentUser);
router.get("/registered-events", verifyUser, getRegisteredEvents);
router.post("/register-to-event", verifyUser, registerUserToEvent);
router.get("/user-events", verifyUser, getUserEvents);

export {router};

