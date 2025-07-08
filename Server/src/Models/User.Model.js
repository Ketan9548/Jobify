import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Student", "Recruiter"],
        required: true
    },
    profile: {
        bio: {
            type: String,
            default: ""
        },
        skills: {
            type: [String],
            default: []
        },
        resume: {  // URL to resume file
            type: String,
            default: ""
        },
        resumeOriginalName: {  // Original name of the resume file
            type: String,
            default: ""
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
        },
        profilePhoto: {  // URL to profile photo
            type: String,
            default: ""
        }
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export { User };
