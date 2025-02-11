import { Router } from "express";
import { registerUser, loginUser, getCurrentUser, getRegisteredEvents, registerUserToEvent, getUserEvents, logoutUser} from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current-user", verifyUser, getCurrentUser);
router.get("/registered-events", verifyUser, getRegisteredEvents);
router.post("/register-to-event/:id", verifyUser, registerUserToEvent);
router.get("/user-events", verifyUser, getUserEvents);
router.get("/logout", verifyUser, logoutUser);

export {router};

