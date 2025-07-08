import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    experience: {
        type: String,
        required: true,
        enum: ["Fresher", "1-2 Years", "3-5 Years", "5+ Years"]
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true,
        default: "Not Disclosed"
    },
    description: {
        type: String,
        required: true
    },
    posted: {
        type: Date,
        default: Date.now
    },
    openings: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
        }
    ]
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);

export { Job };
