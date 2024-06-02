import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true,
    maxlength: [30, "Name cannot exceed 30 character"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    validator: [validator.isEmail, "Please provide email"],
  },
  coverletter: {
    type: String,
    required: [true, "Please provide your cover letter"],
  },
  phone: {
    type: Number,
    required: [true, "Please provide your phone number"],
  },
  address: {
    type: String,
    required: [true, "Please provide your address"],
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  applicantId: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Job Seeker"],
    },
  },
  employerId: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Employer"],
    },
  },
});

export const Application = mongoose.model("Application", applicationSchema);
