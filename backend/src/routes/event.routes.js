import { Router } from "express";
import { createEvent, 
    getEvents, 
    getEventById,
    updateEvent,
    updateEventImage,
    deleteEvent, 
    getEventsByUser, 
    filterEvents,
    registeredUsers} from "../controllers/event.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.post("/create", verifyUser, upload.single("image"), createEvent);
router.get("/my-events", verifyUser, getEventsByUser);
router.get("/event/:id", verifyUser, getEventById);
// router.put("/event/:id", verifyUser, updateEvent);
router.put("/image/:id/", verifyUser, upload.single("image"), updateEventImage);
// router.delete("/event/:id", verifyUser, deleteEvent);
router.get("/events",getEvents);
router.get("/events/filter", verifyUser, filterEvents);
router.get("/event/registered-users/:id", verifyUser, registeredUsers);
export {router};