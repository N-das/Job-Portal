import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// const { JWT_SECRET } = require("../keys");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is requires"],
      trim: true,
      maxlength: [32, "Name cannot exceed 32 characters"],
    },
    email: {
      type: String,
      required: [true, "email is requires"],
      trim: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      validate: [validator.isEmail, "Enter a valid Email"],
    },
    phone: {
      type: Number,
      required: [true, "Phone number requires"],
    },
    password: {
      type: String,
      required: [true, "password is requires"],
      trim: true,
      minlength: [6, "password must have atleast (6) characters"],
      maxlength: [32, "Password cannot exceed 32 characters"],
      select: false,
    },
    role: {
      type: String,
      required: [true, "Please provide your role"],
      enum: ["Job Seeker", "Employer"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE, //3600
  });
};

// module.exports = mongoose.model("User", userSchema);
export const User = mongoose.model("User", userSchema);
