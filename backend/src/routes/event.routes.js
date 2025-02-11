import { Router } from "express";
import { createEvent, 
    getEvents, 
    getEventById,
    updateEvent,
    updateEventImage,
    deleteEvent, 
    getEventsByUser, 
    filterEvents,
    registeredUsers,
    incrementImpressions,
    isRegistered
} from "../controllers/event.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.post("/create", verifyUser, upload.single("image"), createEvent);
router.get("/my-events", verifyUser, getEventsByUser);
router.get("/event/:id", getEventById);
// router.put("/event/:id", verifyUser, updateEvent);
router.put("/update-event/:id/", verifyUser, upload.single("image"), updateEvent);
// router.delete("/event/:id", verifyUser, deleteEvent);
router.get("/events",getEvents);
router.post("/events/filter", filterEvents);
router.get("/event/registered-users/:id", verifyUser, registeredUsers);
router.post("/increment-impression/:id", verifyUser, incrementImpressions);
router.get("/event/is-registered/:id", verifyUser, isRegistered);
export {router};