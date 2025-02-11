import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { EventAttendees } from "../models/eventAttendees.model.js";
import { Event } from "../models/event.model.js";
import mongoose from "mongoose";

const AccessToken = async (userId) => {

    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    return {accessToken};

}    

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    //validation
    if([name, email, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.find({email});
    if(existedUser?.length > 0){
        throw new ApiError(400, "User already exists with this email");
    }

    const user = await User.create({name, email, password});

    const createdUser = await User.findById(user._id).select("-password");

    if(!createdUser){
        throw new ApiError(500, "Failed to create user");
    }

    res.status(201).json(
        new ApiResponse(201, "User registered successfully", createdUser)
    );

});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    //validation
    if([email, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(400, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordMatched(password);

    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid password");
    }

    const {accessToken} = await AccessToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
        httpOnly : true,
        maxAge : 24 * 60 * 60 * 1000,
        withCredentials : true,
    }

    return res.status(200)
    .cookie("access_token", accessToken, options)
    .json(
        new ApiResponse(200, "User logged in successfully", {user : loggedInUser, accessToken})
    );

});

const logoutUser = asyncHandler(async(req,res) => {
    res.clearCookie("access_token");
    return res.status(200).json(
        new ApiResponse(200, "User logged out successfully")
    )
})

const getCurrentUser = asyncHandler(async(req,res) => {
    return res.status(200).json(
        new ApiResponse(200,req.user,"Current User Details")
    )
})

const registerUserToEvent = asyncHandler(async(req,res) => {
    const {id} = req.params;
    console.log("eventId",id);
    const userId = req.user._id;
    console.log("userId",userId);

    const event = await Event.findById(id);
    if(!event){
        throw new ApiError(400, "Event not found");
    }

    console.log(event);

    const isUserAlreadyRegistered = await EventAttendees.findOne({eventId : id, userId});
    if(isUserAlreadyRegistered){
        throw new ApiError(400, "User already registered to this event");
    }

    const eventAttendees = await EventAttendees.create({eventId : id, userId});
    const updatedEvent = await Event.findByIdAndUpdate(id, {$inc : {attendees : 1}}, {new : true});

    if(!updatedEvent){
        throw new ApiError(500, "Failed to update event");
    }

    if(!eventAttendees){
        throw new ApiError(500, "Failed to register user to event");
    }

    const io = req.app.get('io');
    io.emit('event-registered', {eventId : id, totalAttendees : updatedEvent.attendees});

    return res.status(200).json(
        new ApiResponse(200, "User registered to event successfully", eventAttendees)
    )
})

const getRegisteredEvents = asyncHandler(async(req,res) => {
    const userId = req.user._id;

    if(!userId){
        throw new ApiError(400, "User not found");
    }
    const registeredEvents = await User.aggregate([
        {
            $match : {_id : new mongoose.Types.ObjectId(userId)}
        },
        {
            $lookup : {
                from : "eventattendees",
                localField : "_id",
                foreignField : "userId",
                as : "RegisteredEvents"
            }
        },
        {
            $unwind : "$RegisteredEvents"
        },
        {
            $lookup : {
                from : "events",
                localField : "RegisteredEvents.eventId",
                foreignField : "_id",
                as : "EventDetails"
            }
        }
    ])

    // if(!registeredEvents?.length){
    //     throw new ApiError(400, "No events found");
    // }

    return res.status(200).json(
        new ApiResponse(200, "Registered Events", registeredEvents)
    )
})

const getUserEvents = asyncHandler(async(req,res) => {
    const userId = req.user._id;

    // const events = await Event.find({userId});

    // if(!events?.length){
    //     throw new ApiError(400, "No events found");
    // }

    const userEvents = await User.aggregate([
        {
            $match : {_id : new mongoose.Types.ObjectId(userId)}
        },
        {
            $lookup : {
                from : "events",
                localField : "_id",
                foreignField : "createdBy",
                as : "UserEvents"
            }
        }
    ])

    if(!userEvents?.length){
        throw new ApiError(400, "No events found");
    }

    return res.status(200).json(
        new ApiResponse(200, "User Events", userEvents)
    )
})

export {registerUser, 
    loginUser, 
    getCurrentUser, 
    registerUserToEvent, 
    getRegisteredEvents, 
    getUserEvents,
    logoutUser
};
