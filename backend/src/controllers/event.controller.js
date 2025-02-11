import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { EventAttendees } from "../models/eventAttendees.model.js";
import { Event } from "../models/event.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createEvent = asyncHandler(async(req,res) => {
    console.log(req.body);
    const {title, description, category, date, time, shortDescription} = req.body;
    const userId = req.user._id;
    if(!userId){
        throw new ApiError(400, "User not found");
    }

    const imageUrl = req.file?.path;

    if(!imageUrl){
        throw new ApiError(400, "Image not found");
    }

    const eventImage = await uploadOnCloudinary(imageUrl);

    const event = await Event.create({title, description, category, date, time, shortDescription, image: eventImage.secure_url, createdBy : userId});

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
    console.log(id);
    const event = await Event.findById(id).populate("createdBy", "name");
    if(!event){
        throw new ApiError(400, "Event not found");
    }
    return res.status(200).json(new ApiResponse(200, "Event fetched successfully", event));
})

const updateEvent = asyncHandler(async(req,res) => {
    const {id} = req.params;
    const {title, description, category, date, time, shortDescription} = req.body;
    const imageUrl = req.file?.path;
    let event;
    if(imageUrl){
        const eventImage = await uploadOnCloudinary(imageUrl);
        event = await Event.findByIdAndUpdate(id, {title, description, category, date, time, shortDescription, image : eventImage.secure_url}, {new : true});
    }
    else{
        event = await Event.findByIdAndUpdate(id, {title, description, category, date, time, shortDescription}, {new : true});
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
    const {search, eventType, timeFilter} = req.body;
    console.log(req.body);
    const pipeline = [];


    // Match stage for text search across title and location
    if (search) {
        pipeline.push({
            $match: {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { category: { $regex: search, $options: "i" } },
                ]
            }
        });
    }

    // Match specific title if provided
    if (eventType) {
        pipeline.push({
            $match: { category: { $regex: eventType, $options: "i" } }
        });
    }

    // Filter for upcoming events
    if (timeFilter === "upcoming") {
        pipeline.push({
            $match: { date: { $gte: new Date() } }
        });
    }

    // Filter for past events
    if (timeFilter === "past") {
        pipeline.push({
            $match: { date: { $lt: new Date() } }
        });
    }

    // Sort by date
    pipeline.push({
        $sort: { date: 1 }
    });

    // Lookup createdBy user details
    pipeline.push({
        $lookup: {
            from: "users",
            localField: "createdBy",
            foreignField: "_id",
            as: "createdBy"
        }
    });

    // Unwind the createdBy array
    pipeline.push({
        $unwind: "$createdBy"
    });

    const events = await Event.aggregate(pipeline);

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

const incrementImpressions = asyncHandler(async(req,res) => {
    const {id} = req.params;
    const event = await Event.findByIdAndUpdate(id, {$inc : {impressions : 1}}, {new : true});
    if(!event){
        throw new ApiError(400, "Event not found");
    }
    const io = req.app.get('io');
    io.emit('event-impression', {eventId : id, totalImpressions : event.impressions});
    return res.status(200).json(new ApiResponse(200, "Impressions incremented successfully", event));
})

const isRegistered = asyncHandler(async(req,res) => {
    const {id} = req.params;
    const userId = req.user._id;
    let response = true;
    const event = await EventAttendees.findOne({eventId : id, userId : userId});
    if(!event){
        response = false;
    }
    return res.status(200).json(new ApiResponse(200, "Event registered successfully", response));
})

export {createEvent, 
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
};
