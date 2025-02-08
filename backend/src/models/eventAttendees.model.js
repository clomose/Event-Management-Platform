import mongoose from "mongoose";

const eventAttendeesSchema = mongoose.Schema({
    eventId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Event",
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    registeredAt : {
        type : Date,
        default : Date.now
    }
})

const EventAttendees = mongoose.model("EventAttendees", eventAttendeesSchema);

export {EventAttendees};