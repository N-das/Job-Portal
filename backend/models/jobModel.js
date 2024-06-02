import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide job title"],
    trim: true,
    maxlength: [50, "job title cannot exceed 50 characters"],
  },
  decription: {
    type: String,
    required: [true, "Please provide job decription"],
    trim: true,
    maxlength: [400, "job decription cannot exceed 400 characters"],
  },
  category: {
    type: String,
    required: [true, "Please provide job category"],
    trim: true,
  },
  country: {
    type: String,
    required: [true, "Please provide job country"],
  },
  city: {
    type: String,
    required: [true, "Please provide job city"],
  },
  location: {
    type: String,
    required: [true, "Please provide job location"],
  },
  fixedSalary: {
    type: Number,
    minlength: [4, "Fixed salary must contain atleast 4 digits"],
    maxlength: [8, "Fixed salary cannot exceed 8 digits"],
  },
  salaryFrom: {
    type: Number,
    minlength: [4, "salary from must contain atleast 4 digits"],
    maxlength: [8, "salary from cannot exceed 8 digits"],
  },
  salaryTo: {
    type: Number,
    minlength: [4, "salary to must contain atleast 4 digits"],
    maxlength: [8, "salary to cannot exceed 8 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
