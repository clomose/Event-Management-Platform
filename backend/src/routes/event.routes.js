import { Router } from "express";
import { createEvent } from "../controllers/event.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.post("/create", verifyUser, upload.single("image"), createEvent);

export {router};