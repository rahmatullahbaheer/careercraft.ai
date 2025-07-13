import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    registeredPhone: {
      type: String,
    },
    company: {
      type: String,
    },
    summary: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
    },

    profileImage: String,
    phone: {
      type: String,
    },
    contact: {
      country: String,
      street: String,
      cityState: String,
      postalCode: String,
    },
    status: {
      type: Boolean,
      required: true,
    },
    expectedSalary: {
      type: String,
      default: "",
    },
    desiredJobTitle: {
      type: String,
      default: "",
    },
    locationPreference: {
      type: String,
      default: "",
    },
    industry: {
      type: String,
      default: "",
    },
    education: [],
    experience: [],
    skills: [],
    interests: [],
    awards: [],
    publications: [],
    trainings: [],
    references: [],
    languages: [],
    certifications: [],
    projects: [],
    role: {
      type: String,
      default: "user",
    },
    files: [
      {
        id: String,
        fileName: String,
        fileContent: String,
        uploadedDateTime: String,
      },
    ],
    trialResume: {
      type: Boolean,
      default: false,
    },
    emails: [],
    resumes: [],
    coverLetters: [],
    consultingBids: [],
    linkedInAbouts: [],
    linkedInHeadlines: [],
    linkedInJobDescriptions: [],
    linkedInKeywords: [],
    uploadedResume: {},
    chatThreads: {},
    wizardCompleted: {
      type: Boolean,
      default: false,
    },
    wizardReviewed: {
      type: Boolean,
      default: false,
    },
    alertConsent: {
      type: Boolean,
      default: false,
    },
    userCredits: {
      type: Number,
      default: 0,
    },
    totalCredits: {
      type: Number,
      default: 0,
    },
    OpenAiTokensUsed: {
      type: Number,
      default: 0,
    },
    creditPackage: {
      type: Schema.Types.ObjectId,
      ref: "CreditPackage",
    },
    redeemedCoupons: [],
    tours: {
      resumeBuilder: Boolean,
      coverLetter: Boolean,
      emailAssistant: Boolean,
      linkedinOptimizer: Boolean,
      dashboard: Boolean,
    },
  },

  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    throw error;
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
