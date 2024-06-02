import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationModel.js";
import cloudinary from "cloudinary";
import { Job } from "../models/jobModel.js";

export const employerGetAllApplications = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler(
          "Job Seeker are not allowed to access this resources",
          401
        )
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerId.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobSeekerGetAllApplications = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler(
          "Employer are not allowed to access this resources",
          401
        )
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantId.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobSeekerDeleteApplication = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler(
          "Employer are not allowed to access this resources",
          401
        )
      );
    }
    const jobId = req.params.id;
    const application = await Application.findById(jobId);
    if (!application) {
      return next(new ErrorHandler("Application not found", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  }
);

export const postApplication = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer are not allowed to access this resources", 401)
    );
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume Required", 400));
  }
  const { resume } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(
      new ErrorHandler("Resume must be in jpg, png and webp format", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );
  console.log(cloudinaryResponse);
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "cloudinary Error:",
      cloudinaryResponse.error || "unknown error"
    );
    return next(new ErrorHandler("Failed to upload resume", 500));
  }
  const { name, email, coverletter, phone, address, jobId } = req.body;
  const applicantId = {
    user: req.user._id,
    role: "Job Seeker",
  };
  if (!jobId) {
    return next(new ErrorHandler("Job not found", 404));
  }
  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found", 404));
  }
  const employerId = {
    user: jobDetails.postedBy,
    role: "Employer",
  };
  if (
    !name ||
    !email ||
    !coverletter ||
    !phone ||
    !address ||
    !applicantId ||
    !employerId ||
    !resume
  ) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }
  const application = await Application.create({
    name,
    email,
    coverletter,
    phone,
    address,
    applicantId,
    employerId,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "Application submitted successfully",
    application,
  });
});

// 6652ed7f3e517e179b62a313 >> jobId
