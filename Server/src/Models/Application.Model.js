import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    jobs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["Applied", "Interview Scheduled", "Offer Extended", "Rejected"],
        default: "Applied"
    },
}, { timestamps: true });

const Application = mongoose.model("Application", applicationSchema);

export { Application };