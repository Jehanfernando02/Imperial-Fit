import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    weight: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;
