import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["client", "freelancer", "admin"],
      default: "freelancer",
    },
    // Optional Freelancer-specific fields
    skills: [String],
    experience: String,
    bio: String,
    rating: { type: Number, default: 0 },
    currentProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    completedProjects: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    ],
    applications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Applications" },
    ],
    funds: { type: Number, default: 0 },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
