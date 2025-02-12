import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    attendees: {
        type: Number,
        default: 0,
    },
    impressions: {
        type: Number,
        default: 0,
    },
    slotLeft: {
        type: Number,
        default: 100,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},{timestamps: true})

const Event = mongoose.model('Event', eventSchema);

export { Event };
