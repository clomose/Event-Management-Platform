import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { EventAttendees } from "../models/eventAttendees.model.js";
import { Event } from "../models/event.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createEvent = asyncHandler(async(req,res) => {
    console.log(req.body);
    const {title, description, category, date, time} = req.body;
    const userId = req.user._id;
    if(!userId){
        throw new ApiError(400, "User not found");
    }

    const imageUrl = req.file?.path;

    if(!imageUrl){
        throw new ApiError(400, "Image not found");
    }

    const eventImage = await uploadOnCloudinary(imageUrl);

    const event = await Event.create({title, description, category, date, time, image: eventImage.secure_url, createdBy : userId});

    if(!event){
        throw new ApiError(400, "Event not created");
    }

    const createdEvent = await Event.findById(event._id);
    if(!createdEvent){
        throw new ApiError(400, "Event not found");
    }

    return res.status(200).json(new ApiResponse(200, "Event created successfully", event));
})

const getEvents = asyncHandler(async (req, res) => {
    console.log("Fetching events");
    const events = await Event.find({}).populate("createdBy", "name");

    if (!events.length) {
        throw new ApiError(404, "No events found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Events fetched successfully", events)
    );
});


const getEventById = asyncHandler(async(req,res) => {
    const {id} = req.params;
    const event = await Event.findById(id).populate("createdBy", "name");
    if(!event){
        throw new ApiError(400, "Event not found");
    }
    return res.status(200).json(new ApiResponse(200, "Event fetched successfully", event));
})

const updateEvent = asyncHandler(async(req,res) => {
    const {id} = req.params;
    const {title, description, location, date, time, image, isPaid} = req.body;
    const event = await Event.findByIdAndUpdate(id, {title, description, location, date, time, image, isPaid}, {new : true});
    if(!event){
        throw new ApiError(400, "Event not found");
    }
    return res.status(200).json(new ApiResponse(200, "Event updated successfully", event));
})

const updateEventImage = asyncHandler(async(req,res) => {
    const {id} = req.params;
    const imageUrl = req.file?.path;
    if(!imageUrl){
        throw new ApiError(400, "Image not found");
    }
    const eventImage = await uploadOnCloudinary(imageUrl);
    const event = await Event.findByIdAndUpdate(id, {image : eventImage.secure_url}, {new : true});
    if(!event){
        throw new ApiError(400, "Event not found");
    }
    return res.status(200).json(new ApiResponse(200, "Event image updated successfully", event));
})

const deleteEvent = asyncHandler(async(req,res) => {
    const {id} = req.params;
    const event = await Event.findByIdAndDelete(id);
    if(!event){
        throw new ApiError(400, "Event not found");
    }
    return res.status(200).json(new ApiResponse(200, "Event deleted successfully", event));
})

const getEventsByUser = asyncHandler(async(req,res) => {
    const userId = req.user._id;
    const events = await Event.find({createdBy : userId});
    if(!events){
        throw new ApiError(400, "Events not found");
    }
    return res.status(200).json(new ApiResponse(200, "Events fetched successfully", events));
})

const filterEvents = asyncHandler(async(req,res) => {
    const {search, title, location, upcoming, past, isPaid} = req.body;
    
    const pipeline = [];

    // Match stage for text search across title and location
    if (search) {
        pipeline.push({
            $match: {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { location: { $regex: search, $options: "i" } }
                ]
            }
        });
    }

    // Match specific title if provided
    if (title) {
        pipeline.push({
            $match: { title: { $regex: title, $options: "i" } }
        });
    }

    // Match specific location if provided  
    if (location) {
        pipeline.push({
            $match: { location: { $regex: location, $options: "i" } }
        });
    }

    // Filter for upcoming events
    if (upcoming) {
        pipeline.push({
            $match: { date: { $gte: new Date() } }
        });
    }

    // Filter for past events
    if (past) {
        pipeline.push({
            $match: { date: { $lt: new Date() } }
        });
    }

    // Match paid/free events
    if (isPaid !== undefined) {
        pipeline.push({
            $match: { isPaid: isPaid }
        });
    }

    // Sort by date
    pipeline.push({
        $sort: { date: 1 }
    });

    const events = await Event.aggregate(pipeline);

    if(!events?.length){
        throw new ApiError(404, "No events found matching the criteria");
    }

    return res.status(200).json(
        new ApiResponse(200, "Events filtered successfully", events)
    );
})

const registeredUsers = asyncHandler(async(req,res) => {
    const {id} = req.params;
    const event = await Event.findById(id);
    if(!event){
        throw new ApiError(400, "Event not found");
    }
    
    const registeredUsers = await EventAttendees.aggregate([
        {
            $match : {eventId : id}
        },
        {
            $lookup : {
                from : "users",
                localField : "userId",
                foreignField : "_id",
                as : "user"
            }
        },
        {
            $unwind : "$user"
        }
    ])

    if(!registeredUsers){
        throw new ApiError(400, "Registered users not found");
    }

    return res.status(200).json(new ApiResponse(200, "Registered users fetched successfully", registeredUsers));
})


export {createEvent, 
    getEvents, 
    getEventById,
    updateEvent,
    updateEventImage,
    deleteEvent, 
    getEventsByUser, 
    filterEvents,
    registeredUsers
};
