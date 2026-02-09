import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    urlId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Url",
      required: true
    },
    ipAddress: String,
    userAgent: String,
    device: String,
    browser: String,
    os: String,
    country: {
      type: String,
      default: "Unknown"
    },
    clickedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model("Analytics", analyticsSchema);
